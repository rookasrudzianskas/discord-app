import "react-native-gesture-handler";
// import "react-native-get-random-values";

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import {StreamChat} from 'stream-chat';
import {useEffect} from "react";
import { logger } from "react-native-logs";

const API_KEY = '5paxy3knjczj';
const client = StreamChat.getInstance(API_KEY);
const log = logger.createLogger();


const App = () => {
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

        // create the channel
        const channel = client.channel("team", "general", { name: "General" });
        await channel.create();
    };

    useEffect(() => {
       connectUser();
    }, []);

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
            </SafeAreaProvider>
        );
    }
}

export default App;
