import { useEffect, useState } from "react";
import NoticesService from "../../services/notices";

const Notices = ({}) => {
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    const getNotices = async () => {
      const data = await NoticesService.getAll();
      setNotices([...data]);
      return data;
    };
    getNotices();

    // setNotices(...allNotices);
  }, []);
  return (
    <>
      <h1>Notice board</h1>
    </>
  );
};
export default Notices;
