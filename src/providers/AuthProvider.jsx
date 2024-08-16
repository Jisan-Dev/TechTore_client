import { app } from '@/firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const auth = getAuth(app);

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = { user, loading, createUser, signIn, signInWithGoogle, updateUserProfile };

  return <AuthContext.Provider value={authInfo}> {children} </AuthContext.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
  // Array of children{obj}
  children: PropTypes.node,
};
