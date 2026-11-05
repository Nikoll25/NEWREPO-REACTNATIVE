import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SecurityScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactor, setTwoFactor] = useState(true);
  
  const [emailAlertsLogin, setEmailAlertsLogin] = useState(true);
  const [emailAlertsPassword, setEmailAlertsPassword] = useState(true);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [devices, setDevices] = useState([
    { id: '1', name: 'iPhone 14 Pro', subtitle: 'Este dispositivo • Activo ahora', isCurrent: true },
    { id: '2', name: 'MacBook Air M2', subtitle: 'Última actividad hace 2 horas', isCurrent: false },
    { id: '3', name: 'iPad Gen 9', subtitle: 'Última actividad ayer', isCurrent: false },
  ]);

  const [activityLogs, setActivityLogs] = useState([
    { id: '1', title: 'Cambio de contraseña exitoso', date: 'Ayer, 4:15 PM', icon: 'shield-checkmark-outline' },
    { id: '2', title: 'Inicio de sesión desde nuevo dispositivo', date: 'Hace 3 días', icon: 'alert-circle-outline' },
  ]);

  const removeDevice = (id: string) => {
    setDevices(devices.filter(device => device.id !== id));
  };

  const handleCloseAllSessions = () => {
    setDevices(devices.filter(device => device.isCurrent));
    Alert.alert('Éxito', 'Se han cerrado las sesiones en todos los demás dispositivos.');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        {/* Aquí se quitó el ícono de seguridad manteniendo el título y subtítulo */}
        <View>
          <Text style={styles.header}>Seguridad</Text>
          <Text style={styles.subheader}>Administra la seguridad y privacidad de tu cuenta.</Text>
        </View>
      </View>
      
      <View style={styles.contentContainer}>
        {/* Columna Izquierda: Cambiar contraseña e Historial */}
        <View style={styles.cardLeft}>
          <View style={styles.cardHeaderRow}>
            <Ionicons name="key-outline" size={18} color="#557A59" />
            <Text style={styles.sectionTitle}>Cambiar contraseña</Text>
          </View>
          
          <Text style={styles.label}>Contraseña actual</Text>
          <View style={styles.passwordContainer}>
            <TextInput 
              style={styles.passwordInput} 
              secureTextEntry={!showCurrent} 
              placeholder="••••••••" 
              placeholderTextColor="#9EAF9B"
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)} style={styles.eyeIcon}>
              <Ionicons name={showCurrent ? "eye-outline" : "eye-off-outline"} size={18} color="#6A7F75" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Nueva contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput 
              style={styles.passwordInput} 
              secureTextEntry={!showNew} 
              placeholder="••••••••" 
              placeholderTextColor="#9EAF9B"
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNew(!showNew)} style={styles.eyeIcon}>
              <Ionicons name={showNew ? "eye-outline" : "eye-off-outline"} size={18} color="#6A7F75" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirmar nueva contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput 
              style={styles.passwordInput} 
              secureTextEntry={!showConfirm} 
              placeholder="••••••••" 
              placeholderTextColor="#9EAF9B"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeIcon}>
              <Ionicons name={showConfirm ? "eye-outline" : "eye-off-outline"} size={18} color="#6A7F75" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.buttonPrimary}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#FFF" style={{ marginRight: 6 }} />
            <Text style={styles.buttonPrimaryText}>Actualizar contraseña</Text>
          </TouchableOpacity>

          {/* Historial de Actividad */}
          <View style={styles.subCardContainer}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="time-outline" size={18} color="#557A59" />
              <Text style={styles.sectionTitle}>Actividad reciente</Text>
            </View>
            <Text style={styles.subtext}>Últimos eventos importantes en tu cuenta.</Text>
            
            {activityLogs.map((log) => (
              <View key={log.id} style={styles.activityRow}>
                <Ionicons name={log.icon as any} size={18} color="#557A59" />
                <View style={{flex: 1, marginLeft: 10}}>
                  <Text style={styles.deviceTitle}>{log.title}</Text>
                  <Text style={styles.deviceSub}>{log.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Columna Derecha: Opciones adicionales y dispositivos */}
        <View style={styles.rightColumn}>
          {/* Autenticación en dos pasos */}
          <View style={styles.cardRight}>
            <View style={styles.rowBetween}>
              <View style={{flex: 1, marginRight: 10}}>
                <View style={styles.cardHeaderRow}>
                  <Ionicons name="lock-closed-outline" size={18} color="#557A59" />
                  <Text style={styles.sectionTitle}>Autenticación en 2 pasos</Text>
                </View>
                <Text style={styles.subtext}>Agrega una capa extra de seguridad.</Text>
              </View>
              <Switch 
                value={twoFactor} 
                onValueChange={setTwoFactor} 
                trackColor={{ true: '#557A59', false: '#DCE5D8' }} 
                thumbColor={'#FFF'}
              />
            </View>
          </View>

          {/* Alertas de Seguridad por Correo */}
          <View style={styles.cardRight}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="mail-outline" size={18} color="#557A59" />
              <Text style={styles.sectionTitle}>Alertas por correo electrónico</Text>
            </View>
            <Text style={styles.subtext}>Entérate al instante de cambios importantes.</Text>
            
            <View style={[styles.rowBetween, { marginTop: 8 }]}>
              <Text style={styles.alertLabel}>Nuevos inicios de sesión</Text>
              <Switch 
                value={emailAlertsLogin} 
                onValueChange={setEmailAlertsLogin} 
                trackColor={{ true: '#557A59', false: '#DCE5D8' }} 
                thumbColor={'#FFF'}
              />
            </View>

            <View style={[styles.rowBetween, { marginTop: 12 }]}>
              <Text style={styles.alertLabel}>Cambios de contraseña</Text>
              <Switch 
                value={emailAlertsPassword} 
                onValueChange={setEmailAlertsPassword} 
                trackColor={{ true: '#557A59', false: '#DCE5D8' }} 
                thumbColor={'#FFF'}
              />
            </View>
          </View>

          {/* Dispositivos Conectados */}
          <View style={styles.cardRight}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="phone-portrait-outline" size={18} color="#557A59" />
              <Text style={styles.sectionTitle}>Dispositivos Conectados</Text>
            </View>
            <Text style={styles.subtext}>Revisa y gestiona dónde has iniciado sesión.</Text>
            
            {devices.map((device) => (
              <View key={device.id} style={styles.deviceRow}>
                <Ionicons 
                  name={device.name.includes('iPhone') || device.name.includes('iPad') ? "phone-portrait-outline" : "laptop-outline"} 
                  size={20} 
                  color="#557A59" 
                />
                <View style={{flex: 1, marginLeft: 10}}>
                  <Text style={styles.deviceTitle}>{device.name}</Text>
                  <Text style={styles.deviceSub}>{device.subtitle}</Text>
                </View>
                {!device.isCurrent && (
                  <TouchableOpacity onPress={() => removeDevice(device.id)} style={styles.trashIcon}>
                    <Ionicons name="trash-outline" size={18} color="#D9534F" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          {/* Cerrar sesión en otros dispositivos */}
          <View style={styles.cardRight}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="log-out-outline" size={18} color="#557A59" />
              <Text style={styles.sectionTitle}>Cerrar otras sesiones</Text>
            </View>
            <Text style={styles.subtext}>Cierra sesión en todos los dispositivos excepto este.</Text>
            
            <TouchableOpacity style={styles.buttonOutline} onPress={handleCloseAllSessions}>
              <Ionicons name="power-outline" size={16} color="#2C4A3E" style={{ marginRight: 6 }} />
              <Text style={styles.buttonOutlineText}>Cerrar sesiones</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F2', padding: 16 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#2C4A3E', marginBottom: 2 },
  subheader: { fontSize: 13, color: '#6A7F75' },
  
  contentContainer: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' },
  
  cardLeft: { flex: 2, minWidth: 280, backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#DCE5D8', marginBottom: 16 },
  rightColumn: { flex: 2, minWidth: 280, gap: 16 },
  cardRight: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#DCE5D8' },
  
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 8 },
  subCardContainer: { marginTop: 24, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#F4F7F2' },
  
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#2C4A3E' },
  subtext: { fontSize: 11, color: '#6A7F75', marginBottom: 12 },
  
  label: { fontSize: 11, fontWeight: '600', color: '#557A59', marginBottom: 4, marginTop: 12 },
  alertLabel: { fontSize: 12, color: '#2C4A3E', fontWeight: '500', flex: 1, marginRight: 10 },
  
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FBF8', borderWidth: 1, borderColor: '#DCE5D8', borderRadius: 10 },
  passwordInput: { flex: 1, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: '#2C4A3E' },
  eyeIcon: { paddingHorizontal: 12 },

  deviceRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#F4F7F2' },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingVertical: 6 },
  deviceTitle: { fontSize: 13, fontWeight: '600', color: '#2C4A3E' },
  deviceSub: { fontSize: 10, color: '#6A7F75' },
  trashIcon: { padding: 6 },

  buttonPrimary: { backgroundColor: '#557A59', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 20, flexDirection: 'row', justifyContent: 'center' },
  buttonPrimaryText: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },
  
  buttonOutline: { borderWidth: 1, borderColor: '#DCE5D8', paddingVertical: 10, borderRadius: 10, alignItems: 'center', backgroundColor: '#F9FBF8', marginTop: 8, flexDirection: 'row', justifyContent: 'center' },
  buttonOutlineText: { color: '#2C4A3E', fontSize: 13, fontWeight: '600' },
  
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
});