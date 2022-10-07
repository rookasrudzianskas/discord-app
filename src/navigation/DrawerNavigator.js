import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import TabOneScreen from "../screens/TabOneScreen";
import {Linking, Text, View, StyleSheet, LogBox} from "react-native";
import {OverlayProvider, Chat, ChannelList, Channel, MessageList, MessageInput} from 'stream-chat-expo';
import {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAuthContext} from "../contexts/authContext";
import ChannelScreen from "../screens/ChannelScreen";
// import { LogBox. } from 'react-native';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={CustomDrawerContent}>
            <Drawer.Screen name="ChannelScreen" component={ChannelScreen} />
        </Drawer.Navigator>
    );
}

const CustomDrawerContent = (props) => {
    const onChannelSelect = (channel) => {
        // navigate to a screen for this channel
        props.navigation.navigate("ChannelScreen", { channel });
    };

    const { userId } = useAuthContext();

    const filters = { members: { $in: [userId] } };
    const publicFilters = { type: "livestream" };
    return (
        <SafeAreaView {...props}  style={{ flex: 1 }} className="bg-black">
            <View className="items-center">
                <Text className="text-lg font-bold text-white lowercase">Rokas Development</Text>
            </View>

            <Text style={styles.groupTitle}>Public channels</Text>
            <ChannelList onSelect={onChannelSelect} filters={publicFilters} />
        </SafeAreaView>
    );


}

const styles = StyleSheet.create({
    title: {
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        fontSize: 16,
        margin: 10,
    },
    groupTitle: {
        color: "white",
        margin: 10,

    },
});



export default DrawerNavigator;



