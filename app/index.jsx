import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {

  const router = useRouter();

  // Simulación
  const isAuthenticated = false;

  useEffect(() => {

    if (isAuthenticated) {

      router.replace("/(tabs)/explore");

    } else {

      router.replace("/(auth)/login");

    }

  }, []);

  return (
    <View
      style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#F7F6F1"
      }}
    >
      <ActivityIndicator
        size="large"
        color="#8BAF72"
      />
    </View>
  );
}