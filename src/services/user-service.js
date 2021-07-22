import { firestore } from './firebase/FirebaseConfig';

const UserService = {
  user: null,

  async getUser(uid) {
    const userSnapShot = await firestore.collection('users').doc(uid).get();
    const user = userSnapShot.data();
    return user;
  },

  logUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
  },

  logOut() {
    this.user = null;
    localStorage.removeItem('user');
  },
};

export default UserService;
