import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "./user.context";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export default UserProvider;
