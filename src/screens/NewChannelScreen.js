import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import Button from "../components/Button";
import {useChatContext} from "stream-chat-expo";

const NewChannelScreen = () => {
    const [name, setName] = useState('');
    const {client} = useChatContext();

    const createChannel = () => {
        // create a channel
        const channel = client.channel('team', name, {
            name,
        });
    }

    return (
        <View className="space-y-3 mx-3">
           <TextInput autoCapitalize={'none'} autoFocus={true} value={name} onChangeText={setName} placeholder={'Channel name'} className="bg-gray-100 mt-10 mb-5 py-3 rounded-lg px-3"/>
            <Button title={'Create channel'} onPress={createChannel} />
        </View>
    );
};

export default NewChannelScreen;
