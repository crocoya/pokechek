import { firestore } from './firebase/FirebaseConfig';

const PokemonService = {
  post: null,

  async createPostInDatabase(uid, img, name, types) {
    await firestore.collection('posts').doc(uid).set(
      {
        img: img,
        name: name,
        types: types,
      },
      { merge: true }
    );

    this.post = {
      uid,
      img: img,
      name: name,
      types: types,
    };
  },

  async getPokemon(uid) {
    const getPostSnapShot = await firestore.collection('posts').doc(uid).get();
    const post = getPostSnapShot.data();
    return post;
  },

  async deletePokemon(uid) {
    const deletePostSnapShot = await firestore
      .collection('posts')
      .doc(uid)
      .delete();
    const deletePost = deletePostSnapShot.data();
    return deletePost;
  },
};

export default PokemonService;
