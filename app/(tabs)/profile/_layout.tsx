import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

export default function DrawerLayout() {
  const router = useRouter();

  return (
    <Drawer
      initialRouteName="profile"
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTintColor: '#2C4A3E',
        // LOGO Y NOMBRE FIJOS A LA IZQUIERDA
        headerTitle: () => (
          <View style={styles.headerLeftContainer}>
            <Image 
              source={require('../../../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.appTitle}>Florae</Text>
             
            </View>
          </View>
        ),
        // ICONOS A LA DERECHA
        headerRight: () => (
          <View style={styles.headerRightContainer}>
            <TouchableOpacity 
              onPress={() => router.push('/notifications')} 
              style={styles.iconButton}
            >
              <Ionicons name="notifications-outline" size={24} color="#2C4A3E" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => router.push('/profile')} 
              style={styles.iconButton}
            >
              <Ionicons name="person-circle-outline" size={28} color="#2C4A3E" />
            </TouchableOpacity>
          </View>
        ),
        drawerStyle: {
          backgroundColor: '#F4F7F2',
          width: 280,
          paddingTop: 20, // <-- Este es el único cambio añadido para bajarlos un poquito
        },
        drawerActiveTintColor: '#557A59',
        drawerInactiveTintColor: '#6A7F75',
        drawerLabelStyle: { fontWeight: '600', fontSize: 14 },
      }}
    >
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Mi perfil',
          title: '', // Dejamos el título nativo vacío ya que usamos headerTitle personalizado
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="preferences"
        options={{
          drawerLabel: 'Preferencias',
          title: '',
          drawerIcon: ({ color, size }) => <Ionicons name="options-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="security"
        options={{
          drawerLabel: 'Seguridad',
          title: '',
          drawerIcon: ({ color, size }) => <Ionicons name="shield-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="notifications"
        options={{
          drawerLabel: 'Notificaciones',
          title: '',
          drawerIcon: ({ color, size }) => <Ionicons name="notifications-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="privacy"
        options={{
          drawerLabel: 'Privacidad',
          title: '',
          drawerIcon: ({ color, size }) => <Ionicons name="lock-closed-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="account"
        options={{
          drawerLabel: 'Gestión de cuenta',
          title: '',
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 79,
    height: 55,
    borderRadius: 8,
    marginRight: 10,
  },
  appTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C4A3E',
    lineHeight: 18,
  },
  appSubtitle: {
    fontSize: 10,
    color: '#6A7F75',
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  iconButton: {
    padding: 5,
    marginLeft: 10,
  },
});