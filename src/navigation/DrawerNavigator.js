import {createDrawerNavigator} from "@react-navigation/drawer";
import TabOneScreen from "../screens/TabOneScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Test" component={TabOneScreen} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
