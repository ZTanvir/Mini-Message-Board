const UserName = ({ name }) => {
  const fullName = name;
  return (
    <p>
      <span className="material-symbols-outlined">person</span>{" "}
      <span>{fullName}</span>
    </p>
  );
};
export default UserName;
