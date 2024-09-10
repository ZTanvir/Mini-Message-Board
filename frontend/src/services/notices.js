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
const addNotice = async (userId, notice, descriptions) => {
  try {
    const response = await axios.post(`${baseUrl}/new`, {
      user_id: userId,
      notice: notice,
      description: descriptions,
    });
    const resonseData = await response.data;
    return resonseData;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getAll,
  addNotice,
};
