import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useRoute} from "@react-navigation/native";

const ChannelScreen = () => {
    const route = useRoute();
    const channel = route?.params?.channel;

    if(!channel) {
        return (
            <View className="flex-1 items-center justify-center bg-black">
                <Text className="text-white font-bold">Channel not found</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>
                byrookas 🚀
            </Text>
        </View>
    );
};

export default ChannelScreen;
