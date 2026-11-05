import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "jardin":
              iconName = "leaf-outline";
              break;

            case "explore":
              iconName = "search-outline";
              break;

            case "calendar":
              iconName = "calendar-outline";
              break;

            case "profile":
              iconName = "person-outline";
              break;
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: "#8BAF72",
        tabBarInactiveTintColor: "#939fb8",

        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
        },
      })}
    >
      <Tabs.Screen
        name="jardin"
        options={{ title: "Mi Jardín" }}
      />

      <Tabs.Screen
        name="explore"
        options={{ title: "Explorar" }}
      />

      <Tabs.Screen
        name="calendar"
        options={{ title: "Calendario" }}
      />

      <Tabs.Screen
        name="profile"
        options={{ title: "Perfil" }}
      />
    </Tabs>
  );
}