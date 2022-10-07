import React, {useLayoutEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import {OverlayProvider, Chat, ChannelList, Channel, MessageList, MessageInput} from 'stream-chat-expo';

const ChannelScreen = () => {
    const route = useRoute();
    const channel = route?.params?.channel;
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: channel?.data?.name || 'Chat',
        })
    }, []);

    if(!channel) {
        return (
            <View className="flex-1 items-center justify-center bg-black">
                <Text className="text-white font-bold">Channel not found</Text>
            </View>
        );
    }

    return (
        <Channel channel={channel}>
            <MessageList />
            <MessageInput />
        </Channel>
    );
};

export default ChannelScreen;
