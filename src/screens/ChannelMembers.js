import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";
import UserListItem from "../components/UserListItem";
import Button from "../components/Button";

const ChannelMembers = () => {
    const route = useRoute();
    const channel = route.params.channel;
    const [members, setMembers] = useState([]);
    const navigation = useNavigation();

    const fetchMembers = async () => {
        const response = await channel.queryMembers({});
        // console.log('response', response);
        setMembers(response.members);
    }

    useEffect(() => {
        fetchMembers();
    }, [channel]);

    return (
        <View className="mt-10 mx-3">
            <FlatList
                ListHeaderComponent={() => (<Button title={'Invite Members'} onPress={() => {
                    navigation.navigate('InviteMembers', {
                        channel
                    })
                }} />)}
                data={members} keyExtractor={(item) => item.user.id} showsVerticalScrollIndicator={false} renderItem={({item}) => (
                <UserListItem user={item.user} onPress={() => {}} />
            )} />
        </View>
    );
};

export default ChannelMembers;
