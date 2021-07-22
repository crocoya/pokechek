import React from 'react';
import { auth } from './Firebase';

const FirebaseContext = React.createContext();

export function useAuth() {
  return React.useContext(FirebaseContext);
}

export default function Context({ children }) {
  const [currentUser, setCurrentUser] = React.useState();
  const [loading, setLoading] = React.useState(true);

  // Inscription
  function signUpWithEmail(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  // Connexion
  function signInWithEmail(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // Déconnexion
  function signOutUser() {
    return auth.signOut();
  }

  // Mot de passe oublié
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  React.useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((users) => {
      setLoading(false);
      setCurrentUser(users);
    });

    return unsubcribe;
  }, []);

  const value = {
    currentUser,
    signUpWithEmail,
    signInWithEmail,
    signOutUser,
    resetPassword,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {!loading && children}
    </FirebaseContext.Provider>
  );
}
