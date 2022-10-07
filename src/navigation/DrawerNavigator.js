import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import TabOneScreen from "../screens/TabOneScreen";
import {Linking, Text, View} from "react-native";
import {OverlayProvider, Chat, ChannelList, Channel, MessageList, MessageInput} from 'stream-chat-expo';
import {useState} from "react";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={CustomDrawerContent}>
            <Drawer.Screen name="Test" component={TabOneScreen} />
        </Drawer.Navigator>
    );
}

const CustomDrawerContent = (props) => {
    const onChannelSelect = (channel) => {
        // setSelectedChannel(channel);
    }

    return (
        <DrawerContentScrollView {...props}>
            <View className="flex items-center">
                <Text className="text-lg font-bold text-white lowercase">Rokas Development</Text>
            </View>
                <ChannelList onSelect={onChannelSelect} />
        </DrawerContentScrollView>
    );
}

export default DrawerNavigator;
