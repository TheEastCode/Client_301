import axios from 'axios';

const API_URL = `${import.meta.env.VITE_SERVER_URL}`;

const fetchData = async (token, path) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.delete(`${API_URL}${path}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default fetchData;