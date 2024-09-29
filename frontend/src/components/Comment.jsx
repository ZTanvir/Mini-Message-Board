import UserName from "./Username";
import DateTime from "./DateTime";
import EditDelete from "./EditDelete";
import Dialog from "./Dialog";
import DeleteRecord from "./Form/DeleteRecord";
import CommentService from "../services/comments";
import style from "../styles/comment.module.css";
import { useState } from "react";

const Comment = ({
  noticeId,
  allComments,
  setAllComments,
  commentData,
  userComment,
  setUserComment,
}) => {
  const [showEditDelete, setShowEditDelete] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);

  const { id, first_name, last_name, date, comment, old_comment } = commentData;
  const fullName = first_name + " " + last_name;
  const commentId = id;
  const lastComment = old_comment;

  const handleModifyComment = () => {
    setShowEditDelete(!showEditDelete);
  };
  const handleUpdateUi = () => {
    // hide edit delete section
    setShowEditDelete(false);
    // make comment status as edit comment
    setUserComment({
      comment: commentData.comment,
      isEdit: true,
      commentId,
    });
  };
  const handleDeleteUi = () => {
    setIsShowDialog(true);
    setShowEditDelete(false);
  };

  const handleCloseDialog = () => {
    setIsShowDialog(false);
  };

  const handleDeleteComment = () => {
    async function deleteComment() {
      const deletedComment = await CommentService.deleteComment(
        noticeId,
        commentId
      );
      if (deleteComment.message !== "Comment not found") {
        const othersComments = allComments.filter(
          (cmnt) => !(cmnt.id === deletedComment.id)
        );
        setAllComments(othersComments);
      }
    }
    deleteComment();
  };

  return (
    <>
      <section data-commentid={commentId} className={style.commentContainer}>
        <header>
          <div className={style.profileImage}></div>
          <div>
            <div className={style.userInfo}>
              <div className={style.username}>
                <UserName name={fullName} />
              </div>
              <div className={style.commentDateTime}>
                <DateTime showIcon={false} date={date} time={true} />
              </div>
            </div>
          </div>
        </header>
        <main>
          <p>
            <span>edited</span>
          </p>
          <div>
            <div>
              <p className={style.commentText}>{comment}</p>
              <div>
                <span
                  onClick={handleModifyComment}
                  className="material-symbols-outlined"
                >
                  more_horiz
                </span>
                {showEditDelete && (
                  <EditDelete
                    handleEditBtn={handleUpdateUi}
                    handleDeleteBtn={handleDeleteUi}
                  />
                )}
              </div>
            </div>
          </div>

          {isShowDialog && (
            <Dialog
              isOpen={true}
              onClose={handleCloseDialog}
              name="deleteComment"
            >
              <DeleteRecord
                onDelete={handleDeleteComment}
                onCancel={handleCloseDialog}
              />
            </Dialog>
          )}
        </main>
      </section>
    </>
  );
};

export default Comment;
