import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView, Alert, LayoutAnimation } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function PrivacyScreen() {
  const [cloudBackup, setCloudBackup] = useState(true);
  const [cultivationTips, setCultivationTips] = useState(true);
  
  // Estado para controlar qué tarjeta está desplegada
  const [expandedSection, setExpandedSection] = useState<string | null>('account');

  const toggleExpand = (section: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleDownloadData = () => {
    Alert.alert('Exportar datos', 'Te enviaremos un archivo con todas tus bitácoras, notas y registros de plantas.');
  };

  const handleDeleteHistory = () => {
    Alert.alert(
      'Eliminar historial', 
      '¿Estás segura de que deseas borrar todo tu historial de búsqueda y registros guardados?', 
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => Alert.alert('Éxito', 'Historial borrado correctamente.') }
      ]
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert('Política de privacidad', 'Consulta los términos detallados sobre el manejo de tu información en la app.');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Privacidad y Datos</Text>
        <Text style={styles.subheader}>Administra la información de tu cuenta, cultivos y registros.</Text>
      </View>
      
      {/* Tarjeta 1: Cuenta y Preferencias (Desplegable) */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleExpand('account')} activeOpacity={0.7}>
          <View style={styles.cardHeaderLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="person-outline" size={18} color="#557A59" />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Cuenta y Preferencias</Text>
              <Text style={styles.subtext}>Notificaciones y avisos de la app.</Text>
            </View>
          </View>
          <Ionicons 
            name={expandedSection === 'account' ? 'chevron-up' : 'chevron-down'} 
            size={18} 
            color="#6A7F75" 
          />
        </TouchableOpacity>

        {expandedSection === 'account' && (
          <View style={styles.accordionContent}>
            <View style={styles.divider} />
            <View style={styles.rowBetween}>
              <View style={{flex: 1, marginRight: 10}}>
                <Text style={styles.rowTitle}>Consejos y alertas de cultivo</Text>
                <Text style={styles.subtextDescription}>Recibe tips de cuidado y recordatorios útiles en tu correo.</Text>
              </View>
              <Switch 
                value={cultivationTips} 
                onValueChange={setCultivationTips} 
                trackColor={{ true: '#557A59', false: '#DCE5D8' }} 
                thumbColor={'#FFF'}
              />
            </View>
          </View>
        )}
      </View>

      {/* Tarjeta 2: Respaldo y Nube (Desplegable) */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleExpand('backup')} activeOpacity={0.7}>
          <View style={styles.cardHeaderLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="cloud-upload-outline" size={18} color="#557A59" />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Respaldo y Nube</Text>
              <Text style={styles.subtext}>Sincronización de tus plantas y bitácoras.</Text>
            </View>
          </View>
          <Ionicons 
            name={expandedSection === 'backup' ? 'chevron-up' : 'chevron-down'} 
            size={18} 
            color="#6A7F75" 
          />
        </TouchableOpacity>

        {expandedSection === 'backup' && (
          <View style={styles.accordionContent}>
            <View style={styles.divider} />
            <View style={styles.rowBetween}>
              <View style={{flex: 1, marginRight: 10}}>
                <Text style={styles.rowTitle}>Copia de seguridad automática</Text>
                <Text style={styles.subtextDescription}>Respalda fotos y notas de tus cultivos de forma segura.</Text>
              </View>
              <Switch 
                value={cloudBackup} 
                onValueChange={setCloudBackup} 
                trackColor={{ true: '#557A59', false: '#DCE5D8' }} 
                thumbColor={'#FFF'}
              />
            </View>
          </View>
        )}
      </View>

      {/* Tarjeta 3: Administración de Datos (Desplegable) */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleExpand('data')} activeOpacity={0.7}>
          <View style={styles.cardHeaderLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="server-outline" size={18} color="#557A59" />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Administración de Datos</Text>
              <Text style={styles.subtext}>Descarga o solicita copias de tus registros.</Text>
            </View>
          </View>
          <Ionicons 
            name={expandedSection === 'data' ? 'chevron-up' : 'chevron-down'} 
            size={18} 
            color="#6A7F75" 
          />
        </TouchableOpacity>

        {expandedSection === 'data' && (
          <View style={styles.accordionContent}>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuLink} onPress={handleDownloadData}>
              <View style={styles.linkIconContainer}>
                <Ionicons name="download-outline" size={18} color="#557A59" />
              </View>
              <View style={{flex: 1, marginLeft: 12}}>
                <Text style={styles.linkTitle}>Descargar mis datos</Text>
                <Text style={styles.subtextDescription}>Obtén un archivo completo con toda tu información.</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#6A7F75" />
            </TouchableOpacity>

            <View style={styles.dividerInner} />

            <TouchableOpacity style={styles.menuLink} onPress={handlePrivacyPolicy}>
              <View style={styles.linkIconContainer}>
                <Ionicons name="document-text-outline" size={18} color="#557A59" />
              </View>
              <View style={{flex: 1, marginLeft: 12}}>
                <Text style={styles.linkTitle}>Política de privacidad</Text>
                <Text style={styles.subtextDescription}>Consulta cómo protegemos tu información personal.</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#6A7F75" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Tarjeta 4: Historial y Eliminación (Desplegable) */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleExpand('history')} activeOpacity={0.7}>
          <View style={styles.cardHeaderLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="trash-bin-outline" size={18} color="#D9534F" />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Historial y Actividad</Text>
              <Text style={styles.subtext}>Borra registros y búsquedas pasadas.</Text>
            </View>
          </View>
          <Ionicons 
            name={expandedSection === 'history' ? 'chevron-up' : 'chevron-down'} 
            size={18} 
            color="#6A7F75" 
          />
        </TouchableOpacity>

        {expandedSection === 'history' && (
          <View style={styles.accordionContent}>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuLink} onPress={handleDeleteHistory}>
              <View style={[styles.linkIconContainer, { backgroundColor: '#FDF2F2' }]}>
                <Ionicons name="trash-outline" size={18} color="#D9534F" />
              </View>
              <View style={{flex: 1, marginLeft: 12}}>
                <Text style={styles.linkTitle}>Eliminar historial de actividad</Text>
                <Text style={styles.subtextDescription}>Borra tus diagnósticos y búsquedas de plantas.</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#6A7F75" />
            </TouchableOpacity>
          </View>
        )}
      </View>
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
    marginBottom: 16,
    overflow: 'hidden'
  },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
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
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#2C4A3E' },
  subtext: { fontSize: 11, color: '#6A7F75' },
  
  accordionContent: { marginTop: 4 },
  divider: { height: 1, backgroundColor: '#F4F7F2', marginVertical: 12 },
  dividerInner: { height: 1, backgroundColor: '#F4F7F2', marginVertical: 10 },
  
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  rowTitle: { fontSize: 13, fontWeight: 'bold', color: '#2C4A3E', marginBottom: 1 },
  subtextDescription: { fontSize: 11, color: '#6A7F75' },
  
  menuLink: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  linkIconContainer: { 
    width: 32, 
    height: 32, 
    borderRadius: 8, 
    backgroundColor: '#F4F7F2', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  linkTitle: { fontSize: 13, fontWeight: 'bold', color: '#2C4A3E', marginBottom: 1 }
});