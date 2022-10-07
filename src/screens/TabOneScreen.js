import { Text, View } from '../components/Themed';
import {StatusBar} from "expo-status-bar";

export default function TabOneScreen({ navigation }) {
  return (
      <View className="flex-1 bg-black items-center justify-center">
        <Text className="text-lg text-white font-bold">This is working! Rokas!!!</Text>
        <StatusBar style="auto" />
      </View>
  );
}

