import axios from "axios";

const baseUrl = `http://localhost:3000/api/notice`;
const getComments = async (noticeId) => {
  try {
    const result = await axios.get(`${baseUrl}/${noticeId}/comment/all`);
    const data = await result.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
export default { getComments };
