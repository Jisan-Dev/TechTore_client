import { app } from '@/firebase/firebase.config';
import { getAuth } from 'firebase/auth';
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const authInfo = { user };

  return <AuthContext.Provider value={authInfo}> {children} </AuthContext.Provider>;
};

export default AuthProvider;

AuthProvider.propTypes = {
  // Array of children{obj}
  children: PropTypes.node,
};
