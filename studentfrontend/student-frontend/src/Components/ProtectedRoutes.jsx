// import {Navigate} from 'react-router-dom';

// const ProtectedRoutes = ({children}) => {
//     const isLoggedIn = localStorage.getItem("isLoggedIn");
//     return isLoggedIn ? children : <Navigate to="/login" />;
// }
// export default ProtectedRoutes;
const ProtectedRoutes = ({ children }) => {
  const student = localStorage.getItem("student");
  return student ? children : <Navigate to="/" replace />;
};

export default ProtectedRoutes;