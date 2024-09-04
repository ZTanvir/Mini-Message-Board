const UserName = ({ name }) => {
  return (
    <p className="fullName">
      <span className="material-symbols-outlined">person</span>{" "}
      <span>{name}</span>
    </p>
  );
};
export default UserName;
