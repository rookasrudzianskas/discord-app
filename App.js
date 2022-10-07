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

const API_KEY = '5paxy3knjczj';
const client = StreamChat.getInstance(API_KEY);
const log = logger.createLogger();


const App = () => {

    const colorScheme = useColorScheme();


    useEffect(() => {
       connectUser();

    }, []);

    const onChannelSelect = (channel) => {
        setSelectedChannel(channel);
        // log.info("Channel Selected");
        // console.log(channel);
    }

    if (!isLoadingComplete || !isReady) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <OverlayProvider>
                    <Chat client={client} >
                        {/*{!selectedChannel ? (<ChannelList onSelect={onChannelSelect} />) : (*/}
                        {/*    <>*/}
                        {/*        <Channel channel={selectedChannel}>*/}
                        {/*            <Text className="text-lg font-bold mt-16 ml-10" onPress={() => setSelectedChannel(null)}>Back</Text>*/}
                        {/*            <MessageList />*/}
                        {/*            <MessageInput />*/}
                        {/*        </Channel>*/}
                        {/*    </>*/}
                        {/*)}*/}
                        <Navigation colorScheme={colorScheme} />
                        <StatusBar style="light" />
                    </Chat>
                </OverlayProvider>
            </SafeAreaProvider>
        );
    }
}

export default App;
