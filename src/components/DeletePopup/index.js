const DeletePopup = ({ handleYes, handleNo }) => {
    return (
        <div className="popup">
            <p className="popup__message">Voulez-vous vraiment supprimer la ligne ?</p>
            <div className="popup__button">
                <button onClick={handleYes} className="popup__button--yes">Oui</button>
                <button onClick={handleNo} className="popup__button--no">Non</button>
            </div>
        </div>
    );
};

export default DeletePopup;