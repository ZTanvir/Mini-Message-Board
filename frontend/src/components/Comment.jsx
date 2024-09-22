import UserName from "./Username";
import DateTime from "./DateTime";
import EditDelete from "./EditDelete";
import Dialog from "./Dialog";
import DeleteRecord from "./Form/DeleteRecord";
import CommentService from "../services/comments";
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
      </div>
    </>
  );
};

export default Comment;
