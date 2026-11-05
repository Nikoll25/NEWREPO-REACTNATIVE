import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen() {
  const [settings, setSettings] = useState([
    { id: '1', title: 'Recordatorios de riego', subtitle: 'Avisos para hidratar tus plantas', email: true, push: true, icon: 'water-outline' },
    { id: '2', title: 'Recordatorios de fertilización', subtitle: 'Nutrientes y abono a tiempo', email: true, push: true, icon: 'leaf-outline' },
    { id: '3', title: 'Alertas de plagas', subtitle: 'Prevención y control fitosanitario', email: true, push: true, icon: 'bug-outline' },
    { id: '4', title: 'Noticias y consejos', subtitle: 'Novedades para el cuidado de cultivos', email: true, push: false, icon: 'newspaper-outline' },
    { id: '5', title: 'Notificaciones por correo', subtitle: 'Resumen semanal en tu bandeja', email: true, push: false, icon: 'mail-outline' },
    { id: '6', title: 'Notificaciones push', subtitle: 'Alertas instantáneas en el móvil', email: false, push: true, icon: 'notifications-outline' }
  ]);

  const [quietHours, setQuietHours] = useState(false);

  const updateSetting = (index: number, key: 'email' | 'push', val: boolean) => {
    const updated = [...settings];
    updated[index][key] = val;
    setSettings(updated);
  };

  const handleSave = () => {
    Alert.alert('¡Éxito!', 'Tus preferencias de notificación se han guardado correctamente.');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Notificaciones</Text>
        <Text style={styles.subheader}>Elige qué avisos deseas recibir para mantener todo bajo control.</Text>
      </View>
      
      {settings.map((item, index) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name={item.icon as any} size={20} color="#557A59" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
            </View>
          </View>

          <View style={styles.switchesRow}>
            <View style={styles.switchControl}>
              <Text style={styles.switchLabel}>Correo</Text>
              <Switch 
                value={item.email} 
                onValueChange={(val) => updateSetting(index, 'email', val)} 
                trackColor={{ true: '#557A59', false: '#DCE5D8' }}
                thumbColor={'#FFF'}
              />
            </View>

            <View style={styles.switchControl}>
              <Text style={styles.switchLabel}>Push</Text>
              <Switch 
                value={item.push} 
                onValueChange={(val) => updateSetting(index, 'push', val)} 
                trackColor={{ true: '#557A59', false: '#DCE5D8' }}
                thumbColor={'#FFF'}
              />
            </View>
          </View>
        </View>
      ))}

      {/* Tarjeta Extra: Horario de Silencio */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <Ionicons name="moon-outline" size={20} color="#557A59" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.rowTitle}>Horario de silencio</Text>
            <Text style={styles.rowSubtitle}>Pausar notificaciones de 10:00 PM a 7:00 AM</Text>
          </View>
          <Switch 
            value={quietHours} 
            onValueChange={setQuietHours} 
            trackColor={{ true: '#557A59', false: '#DCE5D8' }}
            thumbColor={'#FFF'}
          />
        </View>
      </View>

      {/* Botón de Guardar */}
      <TouchableOpacity style={styles.buttonPrimary} onPress={handleSave}>
        <Ionicons name="checkmark-circle-outline" size={18} color="#FFF" style={{ marginRight: 6 }} />
        <Text style={styles.buttonPrimaryText}>Guardar preferencias</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F2', padding: 16 },
  headerContainer: { marginBottom: 16 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#2C4A3E', marginBottom: 2 },
  subheader: { fontSize: 13, color: '#6A7F75' },
  
  card: { 
    backgroundColor: '#FFFFFF', 
    padding: 16, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: '#DCE5D8', 
    marginBottom: 12 
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  iconContainer: { 
    width: 36, 
    height: 36, 
    borderRadius: 10, 
    backgroundColor: '#F4F7F2', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCE5D8'
  },
  rowTitle: { fontSize: 14, fontWeight: 'bold', color: '#2C4A3E' },
  rowSubtitle: { fontSize: 11, color: '#6A7F75', marginTop: 1 },
  
  switchesRow: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    gap: 20, 
    borderTopWidth: 1, 
    borderTopColor: '#F4F7F2', 
    paddingTop: 10 
  },
  switchControl: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  switchLabel: { fontSize: 12, color: '#6A7F75', fontWeight: '500' },

  buttonPrimary: { 
    backgroundColor: '#557A59', 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 8, 
    marginBottom: 30, 
    flexDirection: 'row', 
    justifyContent: 'center' 
  },
  buttonPrimaryText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' }
});