import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import TabOneScreen from "../screens/TabOneScreen";
import {Linking, Text, View, StyleSheet, LogBox, TouchableOpacity} from "react-native";
import {OverlayProvider, Chat, ChannelList, Channel, MessageList, MessageInput} from 'stream-chat-expo';
import {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAuthContext} from "../contexts/authContext";
import ChannelScreen from "../screens/ChannelScreen";
import {AntDesign, FontAwesome5, Ionicons} from "@expo/vector-icons";
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
        <SafeAreaView {...props}  style={{ flex: 1 }} className="px-3">
            <View className="flex-row items-center space-x-2 ml-8">
                <FontAwesome5 name="discord" size={14} color="gray" />
                <Text className="text-lg font-bold text-white lowercase">Rokas Development</Text>
            </View>

            <TouchableOpacity activeOpacity={0.7} className="mt-5 bg-gray-700 mx-3 flex-row space-x-2 rounded-sm items-center justify-center py-2">
                <Ionicons name="person-add" size={15} color="white" />
                <Text className="text-white font-semibold">INVITE</Text>
            </TouchableOpacity>

            <View className="flex-row items-center justify-start space-x-2 mt-5 py-2 mx-3">
                <AntDesign name="calendar" size={20} color="gray" />
                <Text className="text-white text-[18px] font-bold">Events</Text>
            </View>

            <Text style={styles.groupTitle}>Public channels</Text>
            <ChannelList onSelect={onChannelSelect} filters={publicFilters} />

            <Text style={styles.groupTitle}>Your channels</Text>
            <ChannelList onSelect={onChannelSelect} filters={filters} />
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



