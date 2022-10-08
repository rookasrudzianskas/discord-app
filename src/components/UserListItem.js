import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

const UserListItem = ({user, onPress}) => {
    return (
        <TouchableOpacity onPress={() => onPress(user)} activeOpacity={0.7} className="flex-row items-center space-x-3 my-3">
            <Image source={{uri: user.image}} className="w-12 h-12 rounded-full" />
            <Text className="text-white font-bold">
                {user.name}
            </Text>
        </TouchableOpacity>
    );
};

export default UserListItem;
