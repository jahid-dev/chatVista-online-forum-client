import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../firebase/Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()


    if(loading){
        return <h2 className="text-7xl text-center min-h-screen font-bold">Loading.....</h2>
    }

    if(user){
       return children
    }

    return <Navigate state={location.pathname} to='/login'></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default PrivateRoute;