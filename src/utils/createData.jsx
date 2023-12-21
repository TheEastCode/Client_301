import axios from 'axios';

const API_URL = `${import.meta.env.VITE_SERVER_URL}`;

const createData = async (token, path, body) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(`${API_URL}${path}`, body, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default createData;
