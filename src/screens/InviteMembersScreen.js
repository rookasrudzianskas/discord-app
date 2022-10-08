import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {useChatContext} from "stream-chat-expo";
import {useAuthContext} from "../contexts/authContext";
import {useNavigation} from "@react-navigation/native";
import UserListItem from "../components/UserListItem";

const InviteMembersScreen = () => {
    const {client} = useChatContext();
    const [users, setUsers] = useState([]);
    const {userId} = useAuthContext();
    const navigation = useNavigation();

    const fetchUsers = async () => {
        const response = await client.queryUsers({});
        setUsers(response.users);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <View className="mt-10 mx-3">
            <FlatList data={users} showsVerticalScrollIndicator={false} renderItem={({item}) => (
                <UserListItem user={item} onPress={() => {}} />
            )} />
        </View>
    );
};

export default InviteMembersScreen;
