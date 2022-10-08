import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const Button = ({title = "Button", onPress = () => {}}) => {
    return (
        <TouchableOpacity className="bg-blue-500 items-center justify-center py-2 rounded-lg" onPress={onPress} activeOpacity={0.7}>
            <Text className="text-white font-semibold">
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
