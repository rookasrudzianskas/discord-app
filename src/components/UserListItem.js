import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

const UserListItem = ({user, onPress, isSelected}) => {
    return (
        <TouchableOpacity onPress={() => onPress(user)} activeOpacity={0.7} className="flex-row bg-gray-800/50 rounded-lg px-5 items-center space-x-3 my-3">
            <View className="flex-1 flex-row items-center space-x-3 my-3">
                <Image source={{uri: user.image}} className="w-12 h-12 rounded-full" />
                <Text className="text-white font-bold">
                    {user.name}
                </Text>
            </View>
            <View className="">
                {isSelected && (<Ionicons name="checkmark-circle" size={24} color="white" />)}
            </View>
        </TouchableOpacity>
    );
};

export default UserListItem;
