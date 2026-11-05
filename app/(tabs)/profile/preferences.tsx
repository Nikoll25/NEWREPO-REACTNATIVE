import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PreferencesScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('Español');
  const [tempUnit, setTempUnit] = useState('°C');
  const [dateFormat, setDateFormat] = useState('2026-08-19');
  const [timeZone, setTimeZone] = useState('(UTC-5:00) Popayan,Cauca');

  // Colores dinámicos según el modo claro u oscuro
  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ScrollView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <Text style={[styles.header, { color: currentTheme.textPrimary }]}>Preferencias</Text>
      <Text style={[styles.subheader, { color: currentTheme.textSecondary }]}>Personaliza tu experiencia en Florae.</Text>
      
      {/* Tarjeta de Apariencia (Modo Claro / Oscuro con Sol y Luna) */}
      <View style={[styles.card, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }]}>
        <Text style={[styles.sectionTitle, { color: currentTheme.textPrimary }]}>Apariencia</Text>
        
        <Text style={[styles.inputLabel, { color: currentTheme.accent }]}>Tema</Text>
        <View style={styles.themeRow}>
          <TouchableOpacity 
            style={[styles.themeButton, !isDarkMode ? styles.themeButtonActive : { backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border }]}
            onPress={() => setIsDarkMode(false)}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="sunny-outline" size={16} color={!isDarkMode ? '#557A59' : currentTheme.textSecondary} />
              <Text style={!isDarkMode ? styles.themeTextActive : { color: currentTheme.textSecondary }}>Claro</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.themeButton, isDarkMode ? styles.themeButtonActive : { backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border }]}
            onPress={() => setIsDarkMode(true)}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="moon-outline" size={16} color={isDarkMode ? '#557A59' : currentTheme.textSecondary} />
              <Text style={isDarkMode ? styles.themeTextActive : { color: currentTheme.textSecondary }}>Oscuro</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tarjeta de Configuración Regional */}
      <View style={[styles.card, { backgroundColor: currentTheme.cardBg, borderColor: currentTheme.border }]}>
        <Text style={[styles.sectionTitle, { color: currentTheme.textPrimary }]}>Configuración Regional</Text>

        <Text style={[styles.inputLabel, { color: currentTheme.accent }]}>Idioma</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border, color: currentTheme.textPrimary }]} 
          value={language}
          onChangeText={setLanguage}
          placeholderTextColor={currentTheme.textSecondary}
        />

        <Text style={[styles.inputLabel, { color: currentTheme.accent }]}>Unidades de temperatura</Text>
        <View style={styles.themeRow}>
          <TouchableOpacity 
            style={[styles.themeButton, tempUnit === '°C' ? styles.themeButtonActive : { backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border }]}
            onPress={() => setTempUnit('°C')}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="thermometer-outline" size={16} color={tempUnit === '°C' ? '#557A59' : currentTheme.textSecondary} />
              <Text style={tempUnit === '°C' ? styles.themeTextActive : { color: currentTheme.textSecondary }}>°C (Celsius)</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.themeButton, tempUnit === '°F' ? styles.themeButtonActive : { backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border }]}
            onPress={() => setTempUnit('°F')}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="thermometer-outline" size={16} color={tempUnit === '°F' ? '#557A59' : currentTheme.textSecondary} />
              <Text style={tempUnit === '°F' ? styles.themeTextActive : { color: currentTheme.textSecondary }}>°F (Fahrenheit)</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={[styles.inputLabel, { color: currentTheme.accent }]}>Formato de fecha</Text>
        <View style={[styles.dateContainer, { backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border }]}>
          <TextInput 
            style={[styles.dateInput, { color: currentTheme.textPrimary }]} 
            value={dateFormat}
            onChangeText={setDateFormat}
            placeholder="AAAA-MM-DD"
            placeholderTextColor={currentTheme.textSecondary}
            // @ts-ignore
            {...({ type: 'date' } as any)}
          />
          <Ionicons name="calendar-outline" size={18} color={currentTheme.textSecondary} />
        </View>

        <Text style={[styles.inputLabel, { color: currentTheme.accent }]}>Zona horaria</Text>
        <TextInput 
          style={[styles.input, { backgroundColor: currentTheme.inputBg, borderColor: currentTheme.border, color: currentTheme.textPrimary }]} 
          value={timeZone}
          onChangeText={setTimeZone}
          placeholderTextColor={currentTheme.textSecondary}
        />

        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonPrimaryText}>Guardar preferencias</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Paletas de Colores (Verdes Florae + Modo Claro/Oscuro)
const lightTheme = {
  background: '#F4F7F2',
  cardBg: '#FFFFFF',
  textPrimary: '#2C4A3E',
  textSecondary: '#6A7F75',
  accent: '#557A59',
  border: '#DCE5D8',
  inputBg: '#F9FBF8',
};

const darkTheme = {
  background: '#18241E',
  cardBg: '#22332B',
  textPrimary: '#F4F7F2',
  textSecondary: '#A2B5A8',
  accent: '#7FA185',
  border: '#324D41',
  inputBg: '#1C2B24',
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 2 },
  subheader: { fontSize: 13, marginBottom: 16 },
  card: { padding: 18, borderRadius: 16, borderWidth: 1, marginBottom: 16 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 12 },
  inputLabel: { fontSize: 11, fontWeight: '600', marginBottom: 6, marginTop: 12 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 },
  dateContainer: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dateInput: { flex: 1, fontSize: 14, padding: 0 },
  themeRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  themeButton: { flex: 1, borderWidth: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  themeButtonActive: { flex: 1, borderWidth: 1, borderColor: '#557A59', backgroundColor: '#EAF2EC', paddingVertical: 10, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  buttonContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  themeTextActive: { fontSize: 13, color: '#557A59', fontWeight: 'bold' },
  buttonPrimary: { backgroundColor: '#557A59', paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  buttonPrimaryText: { color: '#FFF', fontSize: 13, fontWeight: 'bold' }
});