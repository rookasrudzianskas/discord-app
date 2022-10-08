import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {useChatContext} from "stream-chat-expo";
import {useAuthContext} from "../contexts/authContext";
import {useNavigation} from "@react-navigation/native";
import UserListItem from "../components/UserListItem";
import Button from "../components/Button";

const InviteMembersScreen = () => {
    const {client} = useChatContext();
    const [users, setUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const {userId} = useAuthContext();
    const navigation = useNavigation();

    const fetchUsers = async () => {
        // @TODO exclude users that are already members of the channel
        const response = await client.queryUsers({});
        setUsers(response.users);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const selectUser = (user) => {
        if(selectedUserIds.includes(user.id)) {
            setSelectedUserIds((existingUsers) =>
                existingUsers.filter((id) => id !== user.id),
            );
        } else {
            setSelectedUserIds(existingUserIds => [...existingUserIds, user.id]);
        }
    }

    const inviteUsers = () => {

    }

    return (
        <View className="mt-10 mx-3">
            <FlatList data={users} showsVerticalScrollIndicator={false}
                      ListHeaderComponent={ () => (
                          !!selectedUserIds.length && (<Button title={'Invite Members'} onPress={inviteUsers} />)
                          )}
                      renderItem={({item}) => (
                <UserListItem user={item} onPress={selectUser} isSelected={selectedUserIds.includes(item.id)} />
            )} />
        </View>
    );
};

export default InviteMembersScreen;
