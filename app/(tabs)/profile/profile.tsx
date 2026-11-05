import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [day, setDay] = useState('12');
  const [month, setMonth] = useState('10');
  const [year, setYear] = useState('1998');
  const [modalVisible, setModalVisible] = useState(false);
  
  // Estado para la foto de perfil
  const [avatarUri, setAvatarUri] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150');

  // Estados temporales dentro del modal
  const [tempDay, setTempDay] = useState(day);
  const [tempMonth, setTempMonth] = useState(month);
  const [tempYear, setTempYear] = useState(year);

  const handleSaveDate = () => {
    setDay(tempDay);
    setMonth(tempMonth);
    setYear(tempYear);
    setModalVisible(false);
  };

  // Función funcional para cambiar la foto con la galería o cámara
  const pickImage = async () => {
    // Pedir permisos de la galería/cámara
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('¡Se requieren permisos para acceder a la galería!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Mi perfil</Text>
      <Text style={styles.subheader}>Actualiza tu información personal.</Text>
      
      <View style={styles.card}>
        <View style={styles.avatarRow}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: avatarUri }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.cameraIconBadge} onPress={pickImage}>
              <Ionicons name="camera" size={12} color="#FFF" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonOutline} onPress={pickImage}>
            <Text style={styles.buttonOutlineText}>Cambiar foto</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Nombre completo</Text>
        <TextInput style={styles.input} defaultValue="María José Gómez" placeholderTextColor="#9EAF9B" />

        <Text style={styles.label}>Nombre de usuario</Text>
        <TextInput style={styles.input} defaultValue="mariajose.g" placeholderTextColor="#9EAF9B" />

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput style={styles.input} defaultValue="mariajose@gmail.com" placeholderTextColor="#9EAF9B" />

        <Text style={styles.label}>Teléfono (opcional)</Text>
        <TextInput style={styles.input} defaultValue="+57 300 123 4567" placeholderTextColor="#9EAF9B" />

        <Text style={styles.label}>Fecha de nacimiento</Text>
        <TouchableOpacity 
          style={styles.inputWithIcon} 
          onPress={() => {
            setTempDay(day);
            setTempMonth(month);
            setTempYear(year);
            setModalVisible(true);
          }}
        >
          <Text style={{ flex: 1, color: '#2C4A3E', fontSize: 14 }}>
            {day} / {month} / {year}
          </Text>
          <Ionicons name="calendar-outline" size={18} color="#557A59" />
        </TouchableOpacity>

        {/* Modal Interactivo de Fecha (Intacto) */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Seleccionar Fecha</Text>
              <Text style={styles.modalSubtitle}>Ingresa tu fecha de nacimiento</Text>

              <View style={styles.datePickerRow}>
                <View style={styles.dateFieldBox}>
                  <Text style={styles.dateFieldLabel}>Día</Text>
                  <TextInput 
                    style={styles.dateInputCenter} 
                    value={tempDay} 
                    onChangeText={setTempDay} 
                    keyboardType="numeric" 
                    maxLength={2} 
                  />
                </View>
                <Text style={styles.dateSeparator}>/</Text>
                <View style={styles.dateFieldBox}>
                  <Text style={styles.dateFieldLabel}>Mes</Text>
                  <TextInput 
                    style={styles.dateInputCenter} 
                    value={tempMonth} 
                    onChangeText={setTempMonth} 
                    keyboardType="numeric" 
                    maxLength={2} 
                  />
                </View>
                <Text style={styles.dateSeparator}>/</Text>
                <View style={styles.dateFieldBox}>
                  <Text style={styles.dateFieldLabel}>Año</Text>
                  <TextInput 
                    style={styles.dateInputCenter} 
                    value={tempYear} 
                    onChangeText={setTempYear} 
                    keyboardType="numeric" 
                    maxLength={4} 
                  />
                </View>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.modalButtonCancel} 
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonCancelText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.modalButtonConfirm} 
                  onPress={handleSaveDate}
                >
                  <Text style={styles.modalButtonConfirmText}>Aceptar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.footerButtons}>
          <TouchableOpacity style={styles.buttonCancel}>
            <Text style={styles.buttonCancelText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonPrimary}>
            <Text style={styles.buttonPrimaryText}>Guardar cambios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F2', padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#2C4A3E', marginBottom: 2 },
  subheader: { fontSize: 13, color: '#6A7F75', marginBottom: 16 },
  card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#DCE5D8', marginBottom: 30 },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 16 },
  avatarContainer: { position: 'relative' },
  avatar: { width: 70, height: 70, borderRadius: 35 },
  cameraIconBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#557A59', padding: 4, borderRadius: 10, borderWidth: 2, borderColor: '#FFF' },
  buttonOutline: { borderWidth: 1, borderColor: '#557A59', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 10, backgroundColor: '#F9FBF8' },
  buttonOutlineText: { color: '#557A59', fontSize: 13, fontWeight: '600' },
  label: { fontSize: 11, fontWeight: '600', color: '#557A59', marginBottom: 4, marginTop: 12 },
  input: { backgroundColor: '#F9FBF8', borderWidth: 1, borderColor: '#DCE5D8', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: '#2C4A3E' },
  inputWithIcon: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FBF8', borderWidth: 1, borderColor: '#DCE5D8', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 12 },
  
  // Estilos del Modal del Calendario (Intactos)
  modalOverlay: { flex: 1, backgroundColor: 'rgba(44, 74, 62, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#FFF', width: '100%', maxWidth: 320, padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#DCE5D8', alignItems: 'center' },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: '#2C4A3E', marginBottom: 4 },
  modalSubtitle: { fontSize: 12, color: '#6A7F75', marginBottom: 20 },
  datePickerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 24, gap: 8 },
  dateFieldBox: { flex: 1, alignItems: 'center' },
  dateFieldLabel: { fontSize: 10, fontWeight: '600', color: '#557A59', marginBottom: 4 },
  dateInputCenter: { backgroundColor: '#F9FBF8', borderWidth: 1, borderColor: '#DCE5D8', borderRadius: 8, width: '100%', textAlign: 'center', paddingVertical: 10, fontSize: 16, fontWeight: 'bold', color: '#2C4A3E' },
  dateSeparator: { fontSize: 18, fontWeight: 'bold', color: '#557A59', marginTop: 16 },
  modalButtons: { flexDirection: 'row', width: '100%', gap: 10 },
  modalButtonCancel: { flex: 1, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: '#DCE5D8', alignItems: 'center', backgroundColor: '#F9FBF8' },
  modalButtonCancelText: { color: '#6A7F75', fontSize: 13, fontWeight: '600' },
  modalButtonConfirm: { flex: 1, paddingVertical: 12, borderRadius: 10, backgroundColor: '#557A59', alignItems: 'center' },
  modalButtonConfirmText: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },

  footerButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 24 },
  buttonCancel: { paddingVertical: 10, paddingHorizontal: 16, justifyContent: 'center' },
  buttonCancelText: { color: '#6A7F75', fontSize: 13, fontWeight: '600' },
  buttonPrimary: { backgroundColor: '#557A59', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 10, justifyContent: 'center' },
  buttonPrimaryText: { color: '#FFF', fontSize: 13, fontWeight: 'bold' }
});