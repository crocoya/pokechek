import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://pokechek-669e8-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default instance;
