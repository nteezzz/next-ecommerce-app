import axios from 'axios';

const fetchAkeneoToken = async () => {
  console.log(process.env.AKENEO_BASE_URL);
  try {
    const response = await axios.post(`${process.env.AKENEO_BASE_URL}/api/oauth/v1/token`, {
      grant_type: 'password',
      client_id: process.env.AKENEO_CLIENT_ID,
      client_secret: process.env.AKENEO_CLIENT_SECRET,
      username: process.env.AKENEO_USERNAME,
      password: process.env.AKENEO_PASSWORD,
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw new Error('Unable to fetch token');
  }
};

export default fetchAkeneoToken;
