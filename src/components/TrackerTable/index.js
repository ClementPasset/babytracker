import { useEffect, useState } from "react";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TrackerRow from "../TrackerRow";
import DeletePopup from "../DeletePopup";
import AddPopup from "../AddPopup";
import RecapTable from "../RecapTable";

const TrackerTable = () => {

    const [datas, setDatas] = useState(null);
    const [deletePopup, setDeletePopup] = useState(null);
    const [addPopup, setAddPopup] = useState(false);

    useEffect(() => {

        fetch(process.env.REACT_APP_API_URL)
            .then(res => res.json())
            .then(res => {
                res.reports = res.reports.filter(elt => {
                    if ((new Date(elt.date)).getDate() >= ((new Date()).getDate() - 1)) {
                        return true;
                    } else {
                        return false;
                    }
                })
                setDatas(res.reports);
            })
            .catch(error => console.log('Error : ', error))
    }, []);

    const handleNo = () => {
        setDeletePopup(null);
    }

    const handleYes = () => {
        fetch(process.env.REACT_APP_API_URL + deletePopup.id,
            {
                method: 'DELETE'
            })
            .then(() => {
                let newDatas = datas.filter(elt => {
                    return elt._id !== deletePopup.id;
                })
                setDatas(newDatas);
                handleNo();
            })
            .catch(error => console.log(error))

    }

    return (
        <>
            {datas && <>
                <button className="addButton" onClick={() => { setAddPopup(true) }}>Ajouter une ligne</button>
                <RecapTable datas={datas} />
                <table className="tracker__table">
                    <thead>
                        <tr>
                            <th>Heure</th>
                            <th>Suivi</th>
                            <th><FontAwesomeIcon icon={faTrash} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas && datas.map((data, index) => {
                            return (
                                <TrackerRow key={`reportsListing-${index}`} data={data} setDeletePopup={setDeletePopup} />
                            )
                        })}
                    </tbody>
                </table>
                {deletePopup && <DeletePopup handleNo={handleNo} handleYes={handleYes} />}
                {addPopup && <AddPopup setAddPopup={setAddPopup} datas={datas} setDatas={setDatas} />}
            </>}
            {!datas && <div className="loader"></div>}
        </>
    );
};

export default TrackerTable;