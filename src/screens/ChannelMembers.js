import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useRoute} from "@react-navigation/native";

const ChannelMembers = () => {
    const route = useRoute();
    const channel = route.params.channel;
    const [members, setMembers] = useState([]);

    const fetchMembers = async () => {
        const response = await channel.queryMembers({});
        console.log('response', response);
    }

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <View>
            <Text className="text-white">
                byrookas 🚀
            </Text>
        </View>
    );
};

export default ChannelMembers;
