import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChannelScreen from "../screens/ChannelScreen";
import {TouchableOpacity} from "react-native";
import {Feather, FontAwesome} from "@expo/vector-icons";
import ChannelMembers from "../screens/ChannelMembers";
import InviteMembersScreen from "../screens/InviteMembersScreen";


const Stack = createNativeStackNavigator();

const ChannelStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Chat" component={ChannelScreen} options={({navigation, route}) => (
                {
                    title: 'Chat',
                    headerRight: () => <MembersIcon route={route} navigation={navigation} />,
                    headerLeft: () => <HambugerIcon navigation={navigation} />,
                }
            )} />
            <Stack.Screen name="ChannelMembers" component={ChannelMembers} options={{title: 'Channel Members'}} />
            <Stack.Screen name="InviteMembers" component={InviteMembersScreen} options={{title: 'Invite Members'}} />

        </Stack.Navigator>
    )
}

const MembersIcon = ({route, navigation}) => {
    if(!route?.params?.channel) {
        return null;
    }
    return (
        <TouchableOpacity onPress={() => navigation.navigate('ChannelMembers', {
            channel: route.params.channel,
        })} className="mr-5" activeOpacity={0.7}>
            <FontAwesome name="user" size={24} color="white" />
        </TouchableOpacity>
    )
}

const HambugerIcon = ({navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.openDrawer()} className="mr-5" activeOpacity={0.7}>
            <Feather name="menu" size={24} color="white" />
        </TouchableOpacity>
    )
}

export default ChannelStack;
