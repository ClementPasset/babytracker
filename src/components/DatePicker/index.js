const DatePicker = ({ date, setDate }) => {

    const handlePreviousDate = () => {
        let newDate = new Date();
        newDate.setDate(date.getDate() - 1);
        setDate(newDate);
    };

    const handleNextDate = () => {
        let newDate = new Date();
        newDate.setDate(date.getDate() + 1);
        setDate(newDate);
    };

    const resetDate = () => {
        setDate(new Date());
    }

    return (
        <div className="datePicker">
            <div onClick={handlePreviousDate} className="triangle triangle--left"></div>
            <p onClick={resetDate}>{date.toLocaleDateString()}</p>
            <div onClick={handleNextDate} className="triangle triangle--right"></div>
        </div>
    );
};

export default DatePicker;