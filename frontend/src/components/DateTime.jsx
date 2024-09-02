const DateTime = ({ showIcon, date, time }) => {
  return (
    <p>
      {showIcon && (
        <span className="material-symbols-outlined">calendar_month</span>
      )}
      {date && <span>{date}</span>}
      {time && <li className="roundList"></li>}
      {time && <span>{time}</span>}
    </p>
  );
};
export default DateTime;
