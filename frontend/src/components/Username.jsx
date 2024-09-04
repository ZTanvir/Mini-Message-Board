const UserName = ({ name }) => {
  const fullNameContainer = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.5rem",
  };

  return (
    <p style={fullNameContainer}>
      <span className="material-symbols-outlined">person</span>{" "}
      <span style={{ textTransform: "capitalize" }}>{name}</span>
    </p>
  );
};
export default UserName;
