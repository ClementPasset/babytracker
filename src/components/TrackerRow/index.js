import pee from '../../assets/pee-drop.png';
import poop from '../../assets/poop.png';
import feddingBottle from '../../assets/baby-bottle.png';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TrackerRow = ({ data, setDeletePopup }) => {

    data.date = new Date(data.date)
    let date = data.date.toLocaleDateString();
    let time = data.date.toLocaleTimeString().split(':');
    time = time[0] + ':' + time[1];

    return (
        <>
            <tr>
                <td>
                    {date}
                    <br />
                    {time}
                </td>
                <td>
                    <img src={pee} alt="pee drop" className={data.urine ? 'active' : ''} />
                    <img src={poop} alt="poop" className={data.stools ? 'active' : ''} />
                    <img src={feddingBottle} alt="feeding bottle" className={data.feeding ? 'active' : ''} />
                </td>
                <td><FontAwesomeIcon onClick={() => { setDeletePopup({ id: data._id }) }} icon={faTrash} style={{ color: 'lightcoral', cursor: 'pointer' }} /></td>
            </tr>
        </>
    );
};

export default TrackerRow;