
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AccountScreen() {
  const router = useRouter();

  const [expandedSection, setExpandedSection] = useState<string | null>('profile');

  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState('Angie');
  const [tempName, setTempName] = useState('Angie');

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [userEmail, setUserEmail] = useState('angie@correo.com');
  const [tempEmail, setTempEmail] = useState('angie@correo.com');

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [modalConfig, setModalConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type: 'logout' | 'delete';
  }>({
    visible: false,
    title: '',
    message: '',
    type: 'logout',
  });

  const toggleExpand = (section: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSaveName = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setUserName(tempName);
    setIsEditingName(false);
  };

  const handleSaveEmail = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setUserEmail(tempEmail);
    setIsEditingEmail(false);
  };

  const handleSavePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsEditingPassword(false);
  };

  const openLogoutModal = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setModalConfig({
      visible: true,
      title: 'Cerrar sesión',
      message: '¿Estás segura de que deseas salir de tu cuenta en este dispositivo?',
      type: 'logout',
    });
  };

  const openDeleteModal = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setModalConfig({
      visible: true,
      title: 'Eliminar cuenta',
      message: 'Esta acción es irreversible y borrará todos tus datos permanentemente.',
      type: 'delete',
    });
  };

  // cerramos el modal y volvemos al login si se confirma la salida
  const handleConfirmAction = () => {
    const accion = modalConfig.type;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setModalConfig({ ...modalConfig, visible: false });

    if (accion === 'logout') {
      router.replace('/(auth)/login');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* título de la vista */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Gestión de Cuenta</Text>
        <Text style={styles.subheader}>
          Administra tu información personal y credenciales de acceso de forma segura.
        </Text>
      </View>

      {/* tarjeta 1: información personal */}
      <View style={[
        styles.card,
        (isEditingName || isEditingEmail) && styles.cardActiveBackground
      ]}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => toggleExpand('profile')}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeaderLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="person-outline" size={20} color="#557A59" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Información personal</Text>
              <Text style={styles.subtextCard}>Nombre de usuario y correo electrónico</Text>
            </View>
          </View>
          <Ionicons
            name={expandedSection === 'profile' ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#6A7F75"
          />
        </TouchableOpacity>

        {expandedSection === 'profile' && (
          <View style={styles.accordionContent}>
            <View style={styles.divider} />

            {/* campo nombre */}
            <View style={styles.menuItemContainer}>
              <View style={styles.menuRow}>
                <View style={styles.linkIconContainer}>
                  <Ionicons name="person-circle-outline" size={18} color="#557A59" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.linkTitle}>Nombre de usuario</Text>
                  <Text style={styles.subtext}>{userName}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.editButton, isEditingName && styles.editButtonActive]}
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setIsEditingName(!isEditingName);
                  }}
                >
                  <Ionicons
                    name={isEditingName ? 'close' : 'create-outline'}
                    size={16}
                    color={isEditingName ? '#FFF' : '#557A59'}
                  />
                </TouchableOpacity>
              </View>

              {isEditingName && (
                <View style={styles.inlineEditBox}>
                  <Text style={styles.inputLabel}>Nuevo nombre</Text>
                  <TextInput
                    style={styles.inputField}
                    value={tempName}
                    onChangeText={setTempName}
                    placeholder="Escribe tu nuevo nombre"
                    placeholderTextColor="#99A8A2"
                  />
                  <TouchableOpacity style={styles.saveButton} onPress={handleSaveName}>
                    <Text style={styles.saveButtonText}>Guardar cambios</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.dividerInner} />

            {/* campo correo */}
            <View style={styles.menuItemContainer}>
              <View style={styles.menuRow}>
                <View style={styles.linkIconContainer}>
                  <Ionicons name="mail-outline" size={18} color="#557A59" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.linkTitle}>Correo electrónico</Text>
                  <Text style={styles.subtext}>{userEmail}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.editButton, isEditingEmail && styles.editButtonActive]}
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setIsEditingEmail(!isEditingEmail);
                  }}
                >
                  <Ionicons
                    name={isEditingEmail ? 'close' : 'create-outline'}
                    size={16}
                    color={isEditingEmail ? '#FFF' : '#557A59'}
                  />
                </TouchableOpacity>
              </View>

              {isEditingEmail && (
                <View style={styles.inlineEditBox}>
                  <Text style={styles.inputLabel}>Nuevo correo electrónico</Text>
                  <TextInput
                    style={styles.inputField}
                    value={tempEmail}
                    onChangeText={setTempEmail}
                    placeholder="Escribe tu nuevo correo"
                    placeholderTextColor="#99A8A2"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <TouchableOpacity style={styles.saveButton} onPress={handleSaveEmail}>
                    <Text style={styles.saveButtonText}>Actualizar correo</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
      </View>

      {/* tarjeta 2: seguridad */}
      <View style={[styles.card, isEditingPassword && styles.cardActiveBackground]}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => toggleExpand('security')}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeaderLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#557A59" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Seguridad y contraseña</Text>
              <Text style={styles.subtextCard}>Modifica tu clave de acceso</Text>
            </View>
          </View>
          <Ionicons
            name={expandedSection === 'security' ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#6A7F75"
          />
        </TouchableOpacity>

        {expandedSection === 'security' && (
          <View style={styles.accordionContent}>
            <View style={styles.divider} />

            <View style={styles.menuItemContainer}>
              <View style={styles.menuRow}>
                <View style={styles.linkIconContainer}>
                  <Ionicons name="key-outline" size={18} color="#557A59" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.linkTitle}>Cambiar contraseña</Text>
                  <Text style={styles.subtext}>Protege tu cuenta con una clave segura</Text>
                </View>
                <TouchableOpacity
                  style={[styles.editButton, isEditingPassword && styles.editButtonActive]}
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setIsEditingPassword(!isEditingPassword);
                  }}
                >
                  <Ionicons
                    name={isEditingPassword ? 'close' : 'create-outline'}
                    size={16}
                    color={isEditingPassword ? '#FFF' : '#557A59'}
                  />
                </TouchableOpacity>
              </View>

              {isEditingPassword && (
                <View style={styles.inlineEditBox}>
                  <Text style={styles.inputLabel}>Contraseña actual</Text>
                  <TextInput
                    style={styles.inputField}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    placeholder="••••••••••••"
                    placeholderTextColor="#99A8A2"
                    secureTextEntry
                  />

                  <Text style={styles.inputLabel}>Nueva contraseña</Text>
                  <TextInput
                    style={styles.inputField}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="••••••••••••"
                    placeholderTextColor="#99A8A2"
                    secureTextEntry
                  />

                  <Text style={styles.inputLabel}>Confirmar contraseña</Text>
                  <TextInput
                    style={styles.inputField}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="••••••••••••"
                    placeholderTextColor="#99A8A2"
                    secureTextEntry
                  />

                  <TouchableOpacity style={styles.saveButton} onPress={handleSavePassword}>
                    <Text style={styles.saveButtonText}>Actualizar contraseña</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
      </View>

      {/* tarjeta 3: acciones de cuenta */}
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.accordionHeader}
          onPress={() => toggleExpand('session')}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeaderLeft}>
            <View style={[
              styles.iconContainer,
              { backgroundColor: '#FDF2F2', borderColor: '#F5C6C6' }
            ]}>
              <Ionicons name="shield-outline" size={20} color="#E53E3E" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Acciones de cuenta</Text>
              <Text style={styles.subtextCard}>Cerrar sesión o eliminar cuenta</Text>
            </View>
          </View>
          <Ionicons
            name={expandedSection === 'session' ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#6A7F75"
          />
        </TouchableOpacity>

        {expandedSection === 'session' && (
          <View style={styles.accordionContent}>
            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.menuRow}
              onPress={openLogoutModal}
              activeOpacity={0.7}
            >
              <View style={styles.linkIconContainer}>
                <Ionicons name="log-out-outline" size={18} color="#557A59" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.linkTitle}>Cerrar sesión</Text>
                <Text style={styles.subtext}>Salir de este dispositivo</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#6A7F75" />
            </TouchableOpacity>

            <View style={styles.dividerInner} />

            <TouchableOpacity
              style={styles.menuRow}
              onPress={openDeleteModal}
              activeOpacity={0.7}
            >
              <View style={[
                styles.linkIconContainer,
                { backgroundColor: '#FDF2F2', borderColor: '#F5C6C6' }
              ]}>
                <Ionicons name="alert-circle-outline" size={18} color="#E53E3E" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={[styles.linkTitle, { color: '#E53E3E' }]}>
                  Eliminar cuenta
                </Text>
                <Text style={styles.subtext}>Borrar perfil de forma permanente</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#6A7F75" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* modal de confirmación */}
      {modalConfig.visible && (
        <View style={styles.modalSolidContainer}>
          <View style={styles.modalCard}>
            <View style={[
              styles.modalIconBox,
              modalConfig.type === 'delete'
                ? styles.modalIconDelete
                : styles.modalIconLogout
            ]}>
              <Ionicons
                name={modalConfig.type === 'delete' ? 'alert-circle-outline' : 'log-out-outline'}
                size={26}
                color={modalConfig.type === 'delete' ? '#E53E3E' : '#557A59'}
              />
            </View>

            <Text style={styles.modalTitle}>{modalConfig.title}</Text>
            <Text style={styles.modalMessage}>{modalConfig.message}</Text>

            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  setModalConfig({ ...modalConfig, visible: false });
                }}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalConfirmButton,
                  modalConfig.type === 'delete' && styles.modalDeleteButton
                ]}
                onPress={handleConfirmAction}
              >
                <Text style={styles.modalConfirmText}>
                  {modalConfig.type === 'delete' ? 'Sí, eliminar' : 'Cerrar sesión'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F2', padding: 16 },
  headerContainer: { marginBottom: 20, marginTop: 4 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#2C4A3E', marginBottom: 4 },
  subheader: { fontSize: 13, color: '#6A7F75', lineHeight: 18 },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8DE',
    marginBottom: 14,
  },
  cardActiveBackground: {
    backgroundColor: '#F0F5EE',
    borderColor: '#A8C3A2'
  },

  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F4F7F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8DE'
  },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#2C4A3E' },
  subtextCard: { fontSize: 12, color: '#6A7F75', marginTop: 1 },

  accordionContent: { marginTop: 4 },
  divider: { height: 1, backgroundColor: '#E2E8DE', marginVertical: 14 },
  dividerInner: { height: 1, backgroundColor: '#E2E8DE', marginVertical: 12 },

  menuItemContainer: { marginVertical: 2 },
  menuRow: { flexDirection: 'row', alignItems: 'center' },
  linkIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F4F7F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8DE'
  },
  menuTextContainer: { flex: 1, marginLeft: 12 },
  linkTitle: { fontSize: 14, fontWeight: '600', color: '#2C4A3E' },
  subtext: { fontSize: 12, color: '#6A7F75', marginTop: 1 },

  editButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F4F7F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8DE'
  },
  editButtonActive: {
    backgroundColor: '#3D5C41',
    borderColor: '#2C4A3E'
  },

  inlineEditBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#D4E2D0',
    shadowColor: '#1A3324',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3D5C41',
    marginBottom: 6,
  },
  inputField: {
    backgroundColor: '#FAFCFA',
    borderWidth: 1,
    borderColor: '#D4E2D0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
    color: '#2C4A3E',
    marginBottom: 12
  },
  saveButton: {
    backgroundColor: '#557A59',
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold'
  },

  // estilos del modal sólido
  modalSolidContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F4F7F2',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8DE',
    shadowColor: '#1A3324',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  modalIconBox: {
    width: 54,
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
  },
  modalIconLogout: {
    backgroundColor: '#F4F7F2',
    borderColor: '#D4E2D0',
  },
  modalIconDelete: {
    backgroundColor: '#FDF2F2',
    borderColor: '#F5C6C6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C4A3E',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 13,
    color: '#6A7F75',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#F4F7F2',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4E2D0',
  },
  modalCancelText: {
    color: '#557A59',
    fontSize: 13,
    fontWeight: 'bold',
  },
  modalConfirmButton: {
    flex: 1,
    backgroundColor: '#557A59',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalDeleteButton: {
    backgroundColor: '#E53E3E',
  },
  modalConfirmText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
