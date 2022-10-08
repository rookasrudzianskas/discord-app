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

    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <View>
            <FlatList data={users} renderItem={({item}) => (
                <UserListItem user={item} />
            )} />
        </View>
    );
};

export default UserListScreen;
