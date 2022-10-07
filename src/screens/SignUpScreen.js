import { useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCachedResources from "../hooks/useCachedResources";
import {useChatContext} from 'stream-chat-expo';
import {useNavigation} from "@react-navigation/native";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const isLoadingComplete = useCachedResources();
  const client = useChatContext();
  const navigation = useNavigation();

  const connectUser = async () => {
    await client.connectUser(
        {
          id: 'rokas',
          name: 'Rokas Rudzianskas',
          image: 'https://yt3.ggpht.com/-CDERLAq3BNY7murpWzg3z9Qde3c9ZrRx59LlLEb1UzKDKZ_ckpTAOlYVQ5TJo9XTgJl2kh9bw=s900-c-k-c0x00ffffff-no-rj',
        },
        // just for the Dev side
        client.devToken('rokas'),
    );

  };


  const signUp = () => {
    connectUser();

    // navigate to the homepage

  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>We are so excited to see you again</Text>

        <Text style={styles.text}>ACCOUNT INFORMATION</Text>

        <TextInput
            autoCapitalize={'none'}
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="Username"
        />
        <TextInput
          value={name}
            autoCapitalize={'none'}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="Full name"
        />
        <TextInput
          value={password}
            autoCapitalize={'none'}
          secureTextEntry={true}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="grey"
          placeholder="Password"
        />

        <Text style={styles.forgotPasswordText}>Forgot password?</Text>

        <Pressable style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#36393E",
    flex: 1,
    padding: 10,
    paddingVertical: 30,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 10,
  },
  subtitle: {
    color: "lightgrey",
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#202225",
    marginVertical: 5,
    padding: 15,
    color: "white",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#5964E8",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "#4CABEB",
    marginVertical: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    marginVertical: 5,
  },
});

export default SignUpScreen;
