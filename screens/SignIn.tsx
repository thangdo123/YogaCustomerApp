import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { signIn } from "../store/slices/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn({ navigation }: { navigation: any }) {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = async () => {
    if (email && password) {
      dispatch(signIn({ email, password }));
    }
  };

  return (
    <View className="h-full flex-col justify-center p-2">
      <View className="p-4 border rounded-lg bg-white">
        <Text className="mb-4 text-center text-xl font-semibold">Yoga App</Text>
        <View className="flex mb-4">
          <Text className="font-medium">Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            className="border px-2 py-1 rounded-lg mb-4"
            placeholder="Enter your email"
          />
          <Text className="font-medium">Password:</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            className="border px-2 py-1 rounded-lg"
            placeholder="Enter your password"
          />
        </View>
        <Button onPress={() => onSignIn()} title="Sign In" />
        <Text className="text-right mt-4">
          Don't have an account,{" "}
          <Text
            className="text-blue-300 font-medium underline italic"
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}
