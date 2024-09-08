import UserName from "./Username";
import DateTime from "./DateTime";

const Comment = ({
  noticeId,
  commentId,
  firstName,
  lastName,
  date,
  comment,
  oldComment,
}) => {
  const fullName = firstName + " " + lastName;
  const lastComment = oldComment;

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
            <span>edit</span>
          </div>
        </main>
        <footer>
          
        </footer>
      </div>
    </>
  );
};

export default Comment;
