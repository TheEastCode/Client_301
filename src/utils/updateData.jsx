import axios from 'axios';

const API_URL = `${import.meta.env.VITE_SERVER_URL}`;

const updateData = async (token, path, body) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.put(`${API_URL}${path}`, body, config);
        return response
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const handleUpdateData = async (path, goalId, auth0, body) => {
    if (!auth0.isAuthenticated) {
        console.log('User is not authenticated.')
        return
    }
    try {
        const claim = await auth0.getIdTokenClaims()
        if (!claim) {
            console.log('Token claim is undefined.')
            return
        }
        const token = claim.__raw
        const response = await updateData(token, `${path}/${goalId}`, body)

        if (response.status === 200) {
            console.log(response.data)
        }
    } catch (error) {
        console.error('Error fetching data from DB. Received:', error)
    }
}

export default handleUpdateData;