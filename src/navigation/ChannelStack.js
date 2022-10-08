import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ChannelScreen from "../screens/ChannelScreen";
import {TouchableOpacity} from "react-native";
import {FontAwesome} from "@expo/vector-icons";


const Stack = createNativeStackNavigator();

const ChannelStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ChannelScreen" component={ChannelScreen} options={({navigation, route}) => (
                {
                    title: 'Channel',
                    headerRight: () => <MembersIcon route={route} navigation={navigation} />,
                }
            )} />
        </Stack.Navigator>
    )
}

const MembersIcon = ({route, navigation}) => {
    if(route?.params?.channel) {
        return null;
    }

    return (
        route?.params?.channel && (
            <TouchableOpacity onPress={() => navigation.navigate('ChannelMembers', {
                channel: route.params.channel,
            })} className="mr-5" activeOpacity={0.7}>
                <FontAwesome name="user" size={24} color="white" />
            </TouchableOpacity>
        )
    )
}
