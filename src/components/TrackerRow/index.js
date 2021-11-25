import pee from '../../assets/pee-drop.png';
import poop from '../../assets/poop.png';
import feddingBottle from '../../assets/baby-bottle.png';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TrackerRow = ({ isLogged, data, setDeletePopup, displayDatas, setDisplayDatas }) => {

    data.date = new Date(data.date)
    let date = data.date.toLocaleDateString();
    let time = data.date.toLocaleTimeString().split(':');
    time = time[0] + ':' + time[1];

    const handleClick = (e) => {
        let newData = { ...data };
        newData[e.target.getAttribute('data')] = !newData[e.target.getAttribute('data')];
        let newDisplayDatas = displayDatas.filter(elt => {
            return elt._id !== data._id;
        })
        newDisplayDatas = [newData, ...newDisplayDatas];
        fetch(process.env.REACT_APP_API_URL + 'reports/' + newData._id,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${isLogged.token}`
                },
                body: JSON.stringify({ report: newData })
            })
            .then(res => res.json())
            .then(() => {
                setDisplayDatas(newDisplayDatas);
            })
            .catch(error => console.log(error))

    };

    return (
        <>
            <tr>
                <td>
                    {date}
                    <br />
                    {time}
                </td>
                <td>
                    <img onClick={handleClick} data="urine" src={pee} alt="pee drop" className={data.urine ? 'active' : ''} />
                    <img onClick={handleClick} data="stools" src={poop} alt="poop" className={data.stools ? 'active' : ''} />
                    <img onClick={handleClick} data="feeding" src={feddingBottle} alt="feeding bottle" className={data.feeding ? 'active' : ''} />
                </td>
                <td><FontAwesomeIcon onClick={() => { setDeletePopup({ id: data._id }) }} icon={faTrash} style={{ color: 'lightcoral', cursor: 'pointer' }} /></td>
            </tr>
        </>
    );
};

export default TrackerRow;