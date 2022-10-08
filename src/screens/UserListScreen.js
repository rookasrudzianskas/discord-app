import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useChatContext} from "stream-chat-expo";

const UserListScreen = () => {
    const {client} = useChatContext();

    const fetchUsers = async () => {
        const response = await client.queryUsers({});
        console.log(response);
    }

    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <View>
            <Text className="text-white">
                byrookas 🚀
            </Text>
        </View>
    );
};

export default UserListScreen;
