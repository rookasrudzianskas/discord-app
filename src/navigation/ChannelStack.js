import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChannelScreen from "../screens/ChannelScreen";
import {TouchableOpacity} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import ChannelMembers from "../screens/ChannelMembers";


const Stack = createNativeStackNavigator();

const ChannelStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Chat" component={ChannelScreen} options={({navigation, route}) => (
                {
                    title: 'Chat',
                    headerRight: () => <MembersIcon route={route} navigation={navigation} />,
                }
            )} />
            <Stack.Screen name="ChannelMembers" component={ChannelMembers} options={{title: 'Channel Members'}} />

        </Stack.Navigator>
    )
}

const MembersIcon = ({route, navigation}) => {
    if(route?.params?.channel) {
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

export default ChannelStack;
