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
import {OverlayProvider, Chat, ChannelList} from 'stream-chat-expo';

const API_KEY = '5paxy3knjczj';
const client = StreamChat.getInstance(API_KEY);
const log = logger.createLogger();


const App = () => {
    const [isReady, setIsReady] = useState(false);
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const connectUser = async () => {
        await client.connectUser(
            {
                    id: 'rokas',
                    name: 'Rokas Rudzianskas',
                    image: 'https://yt3.ggpht.com/-CDERLAq3BNY7murpWzg3z9Qde3c9ZrRx59LlLEb1UzKDKZ_ckpTAOlYVQ5TJo9XTgJl2kh9bw=s900-c-k-c0x00ffffff-no-rj',
                },
            // just for the Dev side
            client.devToken('rokas'),
        );

        setIsReady(true);

        // create the channel
        // const channel = client.channel("team", "general", { name: "General" });
        // await channel.create();
    };

    useEffect(() => {
       connectUser();

    }, []);

    const onChannelSelect = (channel) => {
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
                        <ChannelList onSelect={onChannelSelect} />
                        {/*<Navigation colorScheme={colorScheme} />*/}
                        <StatusBar />
                    </Chat>
                </OverlayProvider>
            </SafeAreaProvider>
        );
    }
}

export default App;
