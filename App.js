import "react-native-gesture-handler";
// import "react-native-get-random-values";

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native'
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import {StreamChat} from 'stream-chat';
import {useEffect, useState} from "react";
import { logger } from "react-native-logs";
import {OverlayProvider, Chat, ChannelList, Channel, MessageList, MessageInput} from 'stream-chat-expo';
import {Text} from "react-native";
import AuthContext from "./src/contexts/authContext";
import {StreamColors} from "./src/constants/Colors";

const API_KEY = '5paxy3knjczj';
const client = StreamChat.getInstance(API_KEY);
const log = logger.createLogger();

const theme = {
    colors: StreamColors,
}

const App = () => {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    useEffect(() => {
        // this is done then component mounts, but we need to do it when the user signs up
        return () => {
            // this is done when the component unmounts
            client.disconnectUser();
        }
    }, []);

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <AuthContext>
                    <OverlayProvider value={{ style: theme }}>
                        <Chat client={client} >
                            <Navigation colorScheme={"dark"} />
                            <StatusBar style="light" />
                        </Chat>
                    </OverlayProvider>
                </AuthContext>
            </SafeAreaProvider>
        );
    }
}

export default App;
