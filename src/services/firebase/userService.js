// import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
// import { FirebaseAuthTypes } from '@react-native-firebase/auth';
// import auth from '@react-native-firebase/auth';

// // Create a context for user data
// const UserContext = createContext<any>(null);

// // Provider component to wrap the app and provide context
// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

//   // Check if the user is authenticated when the app loads
//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged(setUser);
//     return () => unsubscribe();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Custom hook to use user data
// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };
