import { useEffect, useState } from "react";
import Notice from "./Notice";
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
  }, []);
  return (
    <>
      <h1>Notice board</h1>
      {Boolean(notices.length > 0)
        ? notices.map((notice) => (
            <Notice
              key={notice.id}
              id={notice.id}
              title={notice.notice}
              firstName={notice.first_name}
              lastName={notice.last_name}
              date={notice.date}
            />
          ))
        : null}
    </>
  );
};
export default Notices;
