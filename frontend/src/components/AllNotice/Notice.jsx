import DateTime from "../DateTime";
import Usename from "../Username";

const Notice = ({ id, title, firstName, lastName, date }) => {
  const fullName = firstName + " " + lastName;
  return (
    <section data-noticeid={id}>
      <h2>{title}</h2>
      <div>
        <DateTime showIcon={true} date={date} time={true} />
        <Usename name={fullName} />
      </div>
    </section>
  );
};
export default Notice;
