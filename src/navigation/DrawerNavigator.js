import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import TabOneScreen from "../screens/TabOneScreen";
import {Linking, Text, View, StyleSheet, LogBox, TouchableOpacity} from "react-native";
import {OverlayProvider, Chat, ChannelList, Channel, MessageList, MessageInput} from 'stream-chat-expo';
import {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {useAuthContext} from "../contexts/authContext";
import ChannelScreen from "../screens/ChannelScreen";
import {AntDesign, FontAwesome, FontAwesome5, Ionicons} from "@expo/vector-icons";
import {Auth} from "aws-amplify";
import UserListScreen from "../screens/UserListScreen";
import Button from "../components/Button";
import ChannelMembers from "../screens/ChannelMembers";
import NewChannelScreen from "../screens/NewChannelScreen";
// import { LogBox. } from 'react-native';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={CustomDrawerContent}>
            <Drawer.Screen name="ChannelScreen" component={ChannelScreen} options={({navigation, route}) => (
                {
                    title: 'Channel',
                    headerRight: () => (
                        route?.params?.channel && (
                                <TouchableOpacity onPress={() => navigation.navigate('ChannelMembers', {
                                    channel: route.params.channel,
                                })} className="mr-5" activeOpacity={0.7}>
                                    <FontAwesome name="user" size={24} color="white" />
                                </TouchableOpacity>
                            )
                    ),
                }
            )} />
            <Drawer.Screen name="UserList" component={UserListScreen} options={{title: 'Users'}} />
            <Drawer.Screen name="ChannelMembers" component={ChannelMembers} options={{title: 'Channel Members'}} />
            <Drawer.Screen name="NewChannel" component={NewChannelScreen} options={{title: 'New Channel'}} />
        </Drawer.Navigator>
    );
}

const CustomDrawerContent = (props) => {
    const [tab, setTab] = useState('public');
    const {navigation} = props;
    const onChannelSelect = (channel) => {
        // navigate to a screen for this channel
        navigation.navigate("ChannelScreen", { channel });
    };
    const { userId } = useAuthContext();

    const privatefilters = { type: "messaging", members: { $in: [userId] } };
    const publicFilters = { type: { $ne: "messaging" },
        members: { $in: [userId] }
    };

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

            <View className="flex-row items-center justify-between space-x-2 mt-5 py-2">
                <TouchableOpacity onPress={() => setTab('public')} activeOpacity={0.7} className={`${tab === 'public' ? 'bg-white' : 'bg-gray-500'} px-10 py-2 rounded-lg`}>
                    <Text className={`${tab === 'public' ? 'text-black' : 'text-white'} font-semibold`}>Public</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setTab('private')} activeOpacity={0.7} className={`${tab === 'private' ? 'bg-white' : 'bg-gray-500'} px-10 py-2 rounded-lg`}>
                    <Text className={`${tab === 'private' ? 'text-black' : 'text-white'} font-semibold`}>Private</Text>
                </TouchableOpacity>
            </View>

            {tab === 'public' && (
                <>
                    <Button title={'Start'} onPress={() => {navigation.navigate('NewChannel')}} />
                    <ChannelList onSelect={onChannelSelect} filters={publicFilters} />
                </>
                )}

            {tab === 'private' && (
                <>
                    <Button title={'Start'} onPress={() => {navigation.navigate('UserList')}} />
                    <ChannelList onSelect={onChannelSelect} filters={privatefilters} />
                </>
                )}



            <TouchableOpacity activeOpacity={0.7} onPress={() => Auth.signOut()} className="bg-gray-800 py-2 rounded-lg">
                <Text className="text-white font-bold ml-3 text-center">Logout</Text>
            </TouchableOpacity>
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



