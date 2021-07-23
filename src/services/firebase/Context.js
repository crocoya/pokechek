import React from 'react';
import { auth } from './FirebaseConfig';
import { firestore } from './FirebaseConfig';
import UserService from '../user-service';

const FirebaseContext = React.createContext();

export function useAuth() {
  return React.useContext(FirebaseContext);
}

export default function Context({ children }) {
  const [currentUser, setCurrentUser] = React.useState();
  const [loading, setLoading] = React.useState(true);

  // Inscription
  const signUpWithEmail = async (email, password, pseudo) => {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await firestore.collection('users').doc(userCredential.user.uid).set({
      email,
      pseudo,
      cretaedAt: new Date(),
    });
  };

  // Connexion
  function signInWithEmail(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // Déconnexion
  function signOutUser() {
    return auth.signOut() && UserService.logOut();
  }

  // Mot de passe oublié
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  // Ajouter un pokémon
  const addPokemon = async (id, name, image, type) => {
    await firestore.collection('posts').doc(id).set({
      name,
      image,
      type,
      createdAt: new Date(),
    });
  };

  React.useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userSnapShot = await firestore
          .collection('users')
          .doc(authUser.uid)
          .get();
        const dbUser = userSnapShot.data();

        setCurrentUser({
          ...authUser,
          ...dbUser,
        });
      } else {
        setCurrentUser(null);
      }

      setLoading(false);
    });

    return unsubcribe;
  }, []);

  const value = {
    currentUser,
    signUpWithEmail,
    signInWithEmail,
    signOutUser,
    resetPassword,
    addPokemon,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}
