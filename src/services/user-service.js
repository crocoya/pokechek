import { firestore } from './firebase/FirebaseConfig';

const UserService = {
  user: null,

  async createUserInDatabase(uid, pseudo, email) {
    await firestore.collection('users').doc(uid).set(
      {
        pseudo: pseudo,
        email: email,
        createdAt: new Date(),
      },
      { merge: true }
    );

    this.user = {
      uid,
      pseudo: pseudo,
    };
  },

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
};

export default UserService;
