import UserName from "./Username";
import DateTime from "./DateTime";

const Comment = ({
  commentId,
  firstName,
  lastName,
  date,
  comment,
  oldComment,
}) => {
  const fullName = firstName + " " + lastName;
  console.log({ oldComment });

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
          <p>{comment}</p>
          <p>
            <span>edited</span>
          </p>
        </main>
      </div>
    </>
  );
};

export default Comment;
