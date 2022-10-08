import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext({
    userId: null,
    setUserId: (newId) => {

    }
});

const AuthContextComponent = ({ children, client }) => {
    const [userId, setUserId] = useState(null);

    const connectStreamChat = async () => {
        await client.connectUser(
            {
                id: username,
                name: name,
                image:
                    "https://yt3.ggpht.com/-CDERLAq3BNY7murpWzg3z9Qde3c9ZrRx59LlLEb1UzKDKZ_ckpTAOlYVQ5TJo9XTgJl2kh9bw=s900-c-k-c0x00ffffff-no-rj",
            },
            client.devToken(username)
        );

        // Creates the public channel, which anyone can join!
        const channel = client.channel("livestream", "public", {name: "Public"});
        await channel.watch();

        setUserId(username);
    }

    useEffect(() => {
        connectStreamChat();
    }, []);


    return (
        <AuthContext.Provider value={{ userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
}



export default AuthContextComponent;

export const useAuthContext = () => useContext(AuthContext);
