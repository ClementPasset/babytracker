import pee from '../../assets/pee-drop.png';
import poop from '../../assets/poop.png';
import feddingBottle from '../../assets/baby-bottle.png';
import { useEffect, useState } from 'react';

const RecapTable = ({ datas }) => {

    const [count, setCount] = useState({ urine: 0, stools: 0, feeding: 0 });

    useEffect(() => {
        console.log(1)
        let newCount = { urine: 0, stools: 0, feeding: 0 };
        datas.forEach(data => {
            if (data.date.toLocaleDateString() === (new Date()).toLocaleDateString()) {
                newCount.urine += data.urine === true ? 1 : 0;
                newCount.stools += data.stools === true ? 1 : 0;
                newCount.feeding += data.feeding === true ? 1 : 0;
            }
        })
        setCount(newCount);
    }, [datas]);

    return (
        <>
            <h2 style={{ padding: '1rem' }}>Récap de la journée</h2>
            <div className="recapTable">
                <span>{count.urine}</span><img src={pee} alt="pee drop" height="50px" />
                <span>{count.stools}</span><img src={poop} alt="poop" height="50px" />
                <span>{count.feeding}</span><img src={feddingBottle} alt="fedding bottle" height="50px" />
            </div>
        </>
    );
};

export default RecapTable;