import UserName from "./Username";
import DateTime from "./DateTime";
import EditDelete from "./EditDelete";
import { useState } from "react";

const Comment = ({
  noticeId,
  commentId,
  firstName,
  lastName,
  date,
  comment,
  oldComment,
}) => {
  const [showEditDelete, setShowEditDelete] = useState(false);

  const fullName = firstName + " " + lastName;
  const lastComment = oldComment;

  const handleModifyComment = () => {
    setShowEditDelete(!showEditDelete);
  };
  const handleEditComment = () => {};
  const handleDeleteComment = () => {};

  return (
    <>
      <div data-commentid={commentId} className="">
        <header>
          <div></div>
          <div>
            <div>
              <UserName name={fullName} />
              <DateTime showIcon={false} date={date} time={true} />
            </div>
          </div>
        </header>
        <main>
          <p>
            <span>edited</span>
          </p>
          <div>
            <p>{comment}</p>
            <div>
              <span
                onClick={handleModifyComment}
                className="material-symbols-outlined"
              >
                more_horiz
              </span>
              {showEditDelete && (
                <EditDelete
                  handleEditBtn={handleEditComment}
                  handleDeleteBtn={handleDeleteComment}
                />
              )}
            </div>
          </div>
        </main>
        <footer>
          {/* todo
            1. Add new comment
            2. Edit comment
            3. Delete comment
          */}
        </footer>
      </div>
    </>
  );
};

export default Comment;
