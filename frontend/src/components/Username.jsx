const UserName = ({ name }) => {
  const fullNameContainer = {
    display: "flex",
    display: "none",
    flexDirection: "row",
    alignItems: "center",
    gap: "0.5rem",
  };

  return (
    <div style={fullNameContainer}>
      <span className="material-symbols-outlined">person</span>{" "}
      <span style={{ textTransform: "capitalize", fontWeight: "300" }}>
        {name}
      </span>
    </div>
  );
};
export default UserName;
