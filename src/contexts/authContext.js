import { createContext, useState, useContext, useEffect } from "react";
import {API, Auth, graphqlOperation} from "aws-amplify";
import {getStreamToken} from '../graphql/queries';
import {Alert} from "react-native";

const AuthContext = createContext({
    userId: null,
    setUserId: (newId) => {

    }
});

const AuthContextComponent = ({ children, client }) => {
    const [userId, setUserId] = useState(null);

    const connectStreamChat = async () => {

        const userData = await Auth.currentAuthenticatedUser({bypassCache: true});
        const {sub, email} = userData.attributes;
        const tokenResponse = await API.graphql(graphqlOperation(getStreamToken));
        const token = tokenResponse?.data.getStreamToken;
        // console.log("token", token);
        // console.warn("sub", sub);

        if(!token) {Alert.alert('Failed to fetch token', 'Please try again later'); return;}
        await client.connectUser(
            {
                id: sub,
                name: email,
                image:
                    "https://yt3.ggpht.com/-CDERLAq3BNY7murpWzg3z9Qde3c9ZrRx59LlLEb1UzKDKZ_ckpTAOlYVQ5TJo9XTgJl2kh9bw=s900-c-k-c0x00ffffff-no-rj",
            },
            // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWFhZDU5OTQtODhmZC00N2Y4LWE0NDgtNDdiZjIyMzEwOTQ5In0.WEEETLqM5Mm-DZTzqo1bfgA743vaFsj-ATX7RcafFuQ" // token from the DataBase
            token
        );
        // Creates the public channel, which anyone can join!
        const channel = client.channel("livestream", "public", {name: "Public"});
        await channel.watch();

        // console.log(sub)
        setUserId(sub);
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
