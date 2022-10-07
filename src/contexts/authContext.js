import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext({
    userId: null,
    setUserId: (newId) => {

    }
});

const AuthContextComponent = ({ children, client }) => {
    const [userId, setUserId] = useState(null);



    return (
        <AuthContext.Provider value={{ userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
}



export default AuthContextComponent;

export const useAuthContext = () => useContext(AuthContext);
