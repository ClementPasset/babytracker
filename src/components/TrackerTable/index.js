import { useEffect, useState } from "react";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TrackerRow from "../TrackerRow";
import DeletePopup from "../DeletePopup";
import AddPopup from "../AddPopup";
import RecapTable from "../RecapTable";
import DatePicker from "../DatePicker";

const TrackerTable = () => {

    const [datas, setDatas] = useState(null);
    const [displayDatas, setDisplayDatas] = useState(null);
    const [deletePopup, setDeletePopup] = useState(null);
    const [addPopup, setAddPopup] = useState(false);
    const [date, setDate] = useState(new Date());

    useEffect(() => {

        fetch(process.env.REACT_APP_API_URL)
            .then(res => res.json())
            .then(res => {
                setDatas(res.reports);
                res.reports = res.reports.filter(elt => {
                    return (new Date(elt.date)).toLocaleDateString() === date.toLocaleDateString()
                })
                setDisplayDatas(res.reports);
            })
            .catch(error => console.log('Error : ', error))
    }, []);

    useEffect(() => {
        if (datas) {

            let newDisplayDatas = datas.filter(elt => {
                return (new Date(elt.date)).toLocaleDateString() === date.toLocaleDateString()
            });
            setDisplayDatas(newDisplayDatas);
        }
    }, [date]);

    const handleNo = () => {
        setDeletePopup(null);
    }

    const handleYes = () => {
        fetch(process.env.REACT_APP_API_URL + deletePopup.id,
            {
                method: 'DELETE'
            })
            .then(() => {
                let newDatas = displayDatas.filter(elt => {
                    return elt._id !== deletePopup.id;
                })
                setDisplayDatas(newDatas);
                handleNo();
            })
            .catch(error => console.log(error))

    }

    return (
        <>
            {displayDatas && <>
                <button className="addButton" onClick={() => { setAddPopup(true) }}>Ajouter une ligne</button>
                <DatePicker date={date} setDate={setDate} />
                <RecapTable displayDatas={displayDatas} date={date} />
                <table className="tracker__table">
                    <thead>
                        <tr>
                            <th>Heure</th>
                            <th>Suivi</th>
                            <th><FontAwesomeIcon icon={faTrash} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayDatas && displayDatas.map((data, index) => {
                            return (
                                <TrackerRow key={`reportsListing-${index}`} data={data} setDeletePopup={setDeletePopup} />
                            )
                        })}
                    </tbody>
                </table>
                {deletePopup && <DeletePopup handleNo={handleNo} handleYes={handleYes} />}
                {addPopup && <AddPopup setAddPopup={setAddPopup} displayDatas={displayDatas} setDisplayDatas={setDisplayDatas} />}
            </>}
            {!displayDatas && <div className="loader"></div>}
        </>
    );
};

export default TrackerTable;