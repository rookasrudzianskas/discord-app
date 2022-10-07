import {createDrawerNavigator} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} />
        </Drawer.Navigator>
    );
}

export default Drawer;
