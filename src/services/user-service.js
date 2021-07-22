import axios from './axios-orders';
import { firestore } from './firebase/FirebaseConfig';

const UserService = {
  user: null,

  async getUser(uid) {
    const userSnapShot = await firestore.collection('users').doc(uid).get();
    const user = userSnapShot.data();
    return user;
  },

  getCurrentUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  },

  getUserName() {
    return this.user;
  },

  logUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
  },

  logOut() {
    this.user = null;
    localStorage.removeItem('user');
  },

  async getAllUsers() {
    const usersData = await axios.get('/users.json').then((res) => res.data);
    return usersData;
  },

  async createUserInDatabase(uid, name, email) {
    await firestore.collection('users').doc(uid).set(
      {
        pseudo: name,
        email: email,
      },
      { merge: true }
    );

    this.user = {
      uid,
      pseudo: name,
    };
  },

  updateUser(property, value) {
    localStorage.setItem('user', JSON.stringify(this.user));

    axios.patch(
      `/users/${this.user.user_ID}/.json`,
      { [property]: value },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  },
};

export default UserService;
