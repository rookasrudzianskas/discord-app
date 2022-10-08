import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {useChatContext} from "stream-chat-expo";
import UserListItem from "../components/UserListItem";

const UserListScreen = () => {
    const {client} = useChatContext();
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await client.queryUsers({});
        setUsers(response.users);
    }

    const startChannel = () => {
        console.log('start channel');
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
