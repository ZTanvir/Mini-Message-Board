import axios from "axios";
const baseUrl = `http://localhost:3000/api/notice`;

const getAll = async () => {
  try {
    const response = await axios.get(`${baseUrl}/all`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getSingleNotice = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const addNotice = async (userId, notice, descriptions) => {
  try {
    const response = await axios.post(`${baseUrl}/new`, {
      userId: userId,
      notice: notice,
      description: descriptions,
    });
    const responseData = await response.data;
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

const updateNotice = async (noticeId, userId, notice, descriptions) => {
  try {
    const response = await axios.put(`${baseUrl}/${noticeId}`, {
      userId: userId,
      notice: notice,
      description: descriptions,
    });
    const resonseData = await response.data;
    return resonseData;
  } catch (error) {
    console.error(error);
  }
};

const deleteNotice = async (noticeId) => {
  try {
    const response = await axios.delete(`${baseUrl}/${noticeId}`);
    const responseData = await response.data;
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getAll,
  getSingleNotice,
  addNotice,
  updateNotice,
  deleteNotice,
};
