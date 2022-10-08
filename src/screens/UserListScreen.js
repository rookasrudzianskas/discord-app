import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {useChatContext} from "stream-chat-expo";
import UserListItem from "../components/UserListItem";
import {useAuthContext} from "../contexts/authContext";
import {useNavigation} from "@react-navigation/native";

const UserListScreen = () => {
    const {client} = useChatContext();
    const [users, setUsers] = useState([]);
    const {userId} = useAuthContext();
    const navigation = useNavigation();

    const fetchUsers = async () => {
        const response = await client.queryUsers({});
        setUsers(response.users);
    }

    const startChannel = async (user) => {
        // console.log('start channel');
        const channel = client.channel('messaging', {
            members: [userId, user.id],
        });
        await channel.create();
        // navigate to the chat directly
        navigation.navigate('ChannelScreen', {channel});
    }

    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <View className="mt-10 mx-3">
            <FlatList data={users} showsVerticalScrollIndicator={false} renderItem={({item}) => (
                <UserListItem user={item} onPress={startChannel} />
            )} />
        </View>
    );
};

export default UserListScreen;
