import pee from '../../assets/pee-drop.png';
import poop from '../../assets/poop.png';
import feddingBottle from '../../assets/baby-bottle.png';
import { useState } from 'react';

function getDate() {
    let date = new Date();
    if (getTime() === '24:00') {
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString().split('/').reverse().join('-');
    }
    return date.toLocaleDateString().split('/').reverse().join('-');
}
function getTime() {
    let time = (new Date()).toLocaleTimeString().split(':');
    let hours = time[0];
    let minutes = (Math.round(time[1] / 5) * 5);
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    return String('000' + hours).slice(-2) + ':' + String('000' + minutes).slice(-2);
}
const AddPopup = ({ setAddPopup, displayDatas, setDisplayDatas, isLogged }) => {

    const [newReport, setNewReport] = useState({
        date: getDate(),
        time: getTime() === '24:00' ? '00:00' : getTime(),
        urine: false,
        stools: false,
        feeding: false
    });

    const handleClick = (e) => {
        let report = { ...newReport };
        report[e.target.getAttribute('data')] = !report[e.target.getAttribute('data')];
        setNewReport(report);
    }

    const handleDateChange = (e) => {
        let report = { ...newReport };
        report.date = e.target.value;
        setNewReport(report);
    }
    const handleTimeChange = (e) => {
        let report = { ...newReport };
        report.time = e.target.value;
        setNewReport(report);
    }

    const handleSubmit = () => {
        let report = { ...newReport };
        report.date = new Date(report.date + ', ' + report.time);
        delete report.time;
        fetch(process.env.REACT_APP_API_URL + 'reports/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${isLogged.token}`
            },
            body: JSON.stringify(report)
        })
            .then(res => res.json())
            .then((resp) => {
                let data = [resp.report, ...displayDatas];
                setDisplayDatas(data);
            })
            .catch(error => console.log(error));
        setAddPopup(null);
    }

    return (
        <div className="popup">
            <h2>Ajouter une ligne</h2>
            <input type="date" value={newReport.date} onChange={handleDateChange} />
            <input type="time" step="300" value={newReport.time} onChange={handleTimeChange} />
            <div className="popup__images">
                <img draggable="false" data="urine" onClick={handleClick} src={pee} alt="pee drop" className={newReport.urine ? 'active' : ''} />
                <img draggable="false" data="stools" onClick={handleClick} src={poop} alt="poop" className={newReport.stools ? 'active' : ''} />
                <img draggable="false" data="feeding" onClick={handleClick} src={feddingBottle} alt="feeding bottle" className={newReport.feeding ? 'active' : ''} />
            </div>
            <button onClick={handleSubmit} className="addButton">Valider</button>
            <button onClick={() => { setAddPopup(null) }} className="addButton">Annuler</button>
        </div>
    );
};

export default AddPopup;