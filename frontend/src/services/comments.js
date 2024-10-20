import axios from "axios";

const baseUrl = `/api/notice`;
const getComments = async (noticeId) => {
  try {
    const result = await axios.get(`${baseUrl}/${noticeId}/comment/all`);
    const data = await result.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const addComment = async (noticeId, userId, comment) => {
  try {
    const result = await axios.post(`${baseUrl}/${noticeId}/comment/new`, {
      userId,
      comment,
    });
    const data = await result.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateComment = async (userId, noticeId, commentId, comment) => {
  try {
    const response = await axios.put(
      `${baseUrl}/${noticeId}/comment/${commentId}`,
      {
        userId: userId,
        comment: comment,
      }
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteComment = async (noticeId, commentId) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/${noticeId}/comment/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default { getComments, addComment, updateComment, deleteComment };
