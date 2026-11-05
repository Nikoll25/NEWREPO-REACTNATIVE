import React, { useState } from 'react';

import {
    StyleSheet,
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
} from 'react-native';
import {
    SafeAreaProvider,
    SafeAreaView,
} from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';


// ============================================================
// VALIDACIÓN
// ============================================================

const validationSchema = Yup.object().shape({

    nombre: Yup.string().required('El nombre es obligatorio'),

    username: Yup.string().required('El usuario es obligatorio'),

    email: Yup.string().required('El correo electrónico es obligatorio'),

    password: Yup.string().required('La contraseña es obligatoria'),

    confirmPassword: Yup.string().required('Debes confirmar tu contraseña'),

});


// ============================================================
// COMPONENTE
// ============================================================

export default function RegisterFlorae() {

    const router = useRouter();

    // permite mostrar u ocultar la contraseña
    const [showPassword, setShowPassword] = useState(false);

    // permite mostrar u ocultar la confirmación de contraseña
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    // ========================================================
    // FORMIK
    // ========================================================

    const formik = useFormik({

        initialValues: {
            nombre: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },

        validationSchema,

        onSubmit: async (
            values,
            { setSubmitting, resetForm }
        ) => {

            try {

                console.log('Datos de registro:', values);

                Alert.alert(
                    'Registro exitoso',
                    'Tu cuenta ha sido creada correctamente.'
                );

                resetForm();

                // después del registro vuelve al login
                router.replace('/login');

            } catch (error) {

                Alert.alert(
                    'Error',
                    'Ocurrió un problema al registrarte. Intenta de nuevo.'
                );

            } finally {

                setSubmitting(false);

            }

        },

    });


    return (

        <SafeAreaProvider>

            <SafeAreaView
                style={styles.container}
                edges={['bottom', 'left', 'right']}
            >

                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#3E5C3D"
                />


                {/* ==================================================
                    HEADER
                ================================================== */}

                <View style={styles.headerBackground}>

                    {/* foto de fondo */}

                    <Image
                        source={require('../../assets/imageninicio.png')}
                        style={styles.headerImage}
                        resizeMode="cover"
                    />


                    {/* capa oscura */}

                    <View style={styles.overlay} />


                    {/* logo + título + subtítulo */}

                    <View style={styles.brandContainer}>

                        <Image
                            source={require('../../assets/logoinicio.png')}
                            style={styles.logoImage}
                        />


                        <Text style={styles.brandTitle}>
                            Florae
                        </Text>


                        <Text style={styles.brandSubtitle}>
                            Cuida lo que te hace crecer
                        </Text>

                    </View>

                </View>


                {/* ==================================================
                    CONTENEDOR BLANCO
                ================================================== */}

                <View style={styles.cardContainer}>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >


                        {/* ==================================================
                            IMAGEN
                        ================================================== */}

                        <View style={styles.iconHeaderContainer}>

                            <Image
                                source={require('../../assets/regadera.png')}
                                style={styles.welcomeImage}
                            />

                        </View>


                        {/* ==================================================
                            TÍTULO
                        ================================================== */}

                        <Text style={styles.welcomeTitle}>
                            ¡Crea tu cuenta!
                        </Text>


                        {/* ==================================================
                            SUBTÍTULO
                        ================================================== */}

                        <Text style={styles.welcomeSubtitle}>
                            Regístrate para comenzar a cuidar tus plantas
                        </Text>


                        {/* ==================================================
                            NOMBRE
                        ================================================== */}

                        <View style={styles.inputContainer}>

                            <Feather
                                name="user"
                                size={20}
                                color="#6B7280"
                                style={styles.inputIcon}
                            />


                            <TextInput
                                style={styles.input}
                                placeholder="Nombre completo"
                                placeholderTextColor="#A0AEC0"
                                keyboardType="default"
                                autoCapitalize="words"
                                onChangeText={
                                    formik.handleChange('nombre')
                                }
                                onBlur={
                                    formik.handleBlur('nombre')
                                }
                                value={
                                    formik.values.nombre
                                }
                            />

                        </View>


                        {/* error nombre */}

                        {formik.touched.nombre &&
                            formik.errors.nombre && (

                                <Text style={styles.errorText}>
                                    {formik.errors.nombre}
                                </Text>

                            )}


                        {/* ==================================================
                            USUARIO
                        ================================================== */}

                        <View style={styles.inputContainer}>

                            <Feather
                                name="at-sign"
                                size={20}
                                color="#6B7280"
                                style={styles.inputIcon}
                            />


                            <TextInput
                                style={styles.input}
                                placeholder="Nombre de usuario"
                                placeholderTextColor="#A0AEC0"
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={
                                    formik.handleChange('username')
                                }
                                onBlur={
                                    formik.handleBlur('username')
                                }
                                value={
                                    formik.values.username
                                }
                            />

                        </View>


                        {/* error usuario */}

                        {formik.touched.username &&
                            formik.errors.username && (

                                <Text style={styles.errorText}>
                                    {formik.errors.username}
                                </Text>

                            )}


                        {/* ==================================================
                            CORREO
                        ================================================== */}

                        <View style={styles.inputContainer}>

                            <Feather
                                name="mail"
                                size={20}
                                color="#6B7280"
                                style={styles.inputIcon}
                            />


                            <TextInput
                                style={styles.input}
                                placeholder="Correo electrónico"
                                placeholderTextColor="#A0AEC0"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={
                                    formik.handleChange('email')
                                }
                                onBlur={
                                    formik.handleBlur('email')
                                }
                                value={
                                    formik.values.email
                                }
                            />

                        </View>


                        {/* error correo */}

                        {formik.touched.email &&
                            formik.errors.email && (

                                <Text style={styles.errorText}>
                                    {formik.errors.email}
                                </Text>

                            )}


                        {/* ==================================================
                            CONTRASEÑA
                        ================================================== */}

                        <View style={styles.inputContainer}>

                            <Feather
                                name="lock"
                                size={20}
                                color="#6B7280"
                                style={styles.inputIcon}
                            />


                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                placeholderTextColor="#A0AEC0"
                                secureTextEntry={!showPassword}
                                onChangeText={
                                    formik.handleChange('password')
                                }
                                onBlur={
                                    formik.handleBlur('password')
                                }
                                value={
                                    formik.values.password
                                }
                            />


                            {/* mostrar contraseña */}

                            <TouchableOpacity
                                onPress={() =>
                                    setShowPassword(!showPassword)
                                }
                                style={styles.eyeIcon}
                            >

                                <Feather
                                    name={
                                        showPassword
                                            ? 'eye'
                                            : 'eye-off'
                                    }
                                    size={18}
                                    color="#A0AEC0"
                                />

                            </TouchableOpacity>

                        </View>


                        {/* error contraseña */}

                        {formik.touched.password &&
                            formik.errors.password && (

                                <Text style={styles.errorText}>
                                    {formik.errors.password}
                                </Text>

                            )}


                        {/* ==================================================
                            CONFIRMAR CONTRASEÑA
                        ================================================== */}

                        <View style={styles.inputContainer}>

                            <Feather
                                name="lock"
                                size={20}
                                color="#6B7280"
                                style={styles.inputIcon}
                            />


                            <TextInput
                                style={styles.input}
                                placeholder="Confirmar contraseña"
                                placeholderTextColor="#A0AEC0"
                                secureTextEntry={!showConfirmPassword}
                                onChangeText={
                                    formik.handleChange('confirmPassword')
                                }
                                onBlur={
                                    formik.handleBlur('confirmPassword')
                                }
                                value={
                                    formik.values.confirmPassword
                                }
                            />


                            {/* mostrar confirmación */}

                            <TouchableOpacity
                                onPress={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                style={styles.eyeIcon}
                            >

                                <Feather
                                    name={
                                        showConfirmPassword
                                            ? 'eye'
                                            : 'eye-off'
                                    }
                                    size={18}
                                    color="#A0AEC0"
                                />

                            </TouchableOpacity>

                        </View>


                        {/* error confirmar contraseña */}

                        {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword && (

                                <Text style={styles.errorText}>
                                    {formik.errors.confirmPassword}
                                </Text>

                            )}


                        {/* ==================================================
                            REGISTRARSE
                        ================================================== */}

                        <TouchableOpacity
                            style={[
                                styles.submitButton,
                                formik.isSubmitting &&
                                styles.disabledButton,
                            ]}
                            onPress={formik.handleSubmit}
                            disabled={formik.isSubmitting}
                        >

                            <Text style={styles.submitButtonText}>

                                {formik.isSubmitting
                                    ? 'Creando cuenta...'
                                    : 'Crear cuenta'}

                            </Text>

                        </TouchableOpacity>


                        {/* ==================================================
                            SEPARADOR
                        ================================================== */}

                        <View style={styles.dividerContainer}>

                            <View style={styles.dividerLine} />

                            <Text style={styles.dividerText}>
                                o
                            </Text>

                            <View style={styles.dividerLine} />

                        </View>


                        {/* ==================================================
                            GOOGLE
                        ================================================== */}

                        <TouchableOpacity
                            style={styles.googleButton}
                            onPress={() =>
                                Alert.alert(
                                    'Google Auth',
                                    'Aquí se conectará el registro con Google.'
                                )
                            }
                        >

                            <View style={styles.googleIconCircle}>

                                <Image
                                    source={require('../../assets/gmail.png')}
                                    style={styles.googleImage}
                                />

                            </View>


                            <Text style={styles.googleButtonText}>
                                Registrarse con Google
                            </Text>

                        </TouchableOpacity>


                        {/* ==================================================
                            VOLVER AL LOGIN
                        ================================================== */}

                        <View style={styles.registerContainer}>

                            <Text style={styles.registerText}>
                                ¿Ya tienes una cuenta?{' '}
                            </Text>


                            <TouchableOpacity
                                onPress={() => {
                                    router.push('/login');
                                }}
                            >

                                <Text style={styles.registerLink}>
                                    Inicia sesión
                                </Text>

                            </TouchableOpacity>

                        </View>


                        {/* ==================================================
                            VERSIÓN
                        ================================================== */}

                        <Text style={styles.versionText}>
                            Florae v1.0.0
                        </Text>

                    </ScrollView>

                </View>

            </SafeAreaView>

        </SafeAreaProvider>

    );

}


// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#3E5C3D',
    },


    // ========================================================
    // header
    // ========================================================

    headerBackground: {
        height: 300,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },


    headerImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
    },


    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(20, 41, 21, 0.5)',
        zIndex: 1,
    },


    brandContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        zIndex: 2,
        elevation: 2,
    },


    logoImage: {
        width: 100,
        height: 100,
    },


    brandTitle: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 2,
        fontStyle: 'italic',
        zIndex: 3,
    },


    brandSubtitle: {
        fontSize: 16,
        color: '#FFFFFF',
        fontStyle: 'italic',
        zIndex: 3,
        marginTop: 5,
        marginBottom: 100,
    },


    // ========================================================
    // tarjeta
    // ========================================================

    cardContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        marginTop: -25,
    },


    scrollContent: {
        paddingHorizontal: 28,
        paddingTop: 24,
        paddingBottom: 20,
        alignItems: 'center',
    },


    // ========================================================
    // imagen
    // ========================================================

    iconHeaderContainer: {
        marginBottom: 8,
    },


    welcomeImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },


    // ========================================================
    // textos
    // ========================================================

    welcomeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A202C',
        textAlign: 'center',
    },


    welcomeSubtitle: {
        fontSize: 14,
        color: '#718096',
        textAlign: 'center',
        marginTop: 4,
        marginBottom: 15,
    },


    // ========================================================
    // inputs
    // ========================================================

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 48,
        width: '100%',
        marginTop: 10,
        backgroundColor: '#FAFAFA',
    },


    inputIcon: {
        marginRight: 10,
    },


    input: {
        flex: 1,
        fontSize: 15,
        color: '#2D3748',
    },


    eyeIcon: {
        padding: 4,
    },


    // ========================================================
    // errores
    // ========================================================

    errorText: {
        color: '#E53E3E',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginTop: 4,
        marginLeft: 4,
    },


    // ========================================================
    // botón registro
    // ========================================================

    submitButton: {
        backgroundColor: '#557C55',
        borderRadius: 12,
        height: 48,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18,
    },


    disabledButton: {
        backgroundColor: '#8FA88F',
    },


    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },


    // ========================================================
    // separador
    // ========================================================

    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 16,
    },


    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E2E8F0',
    },


    dividerText: {
        marginHorizontal: 12,
        color: '#718096',
        fontSize: 14,
    },


    // ========================================================
    // google
    // ========================================================

    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#CBD5E0',
        borderRadius: 12,
        height: 48,
        width: '100%',
        backgroundColor: '#FFFFFF',
    },


    googleIconCircle: {
        marginRight: 8,
    },


    googleImage: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },


    googleButtonText: {
        color: '#2D3748',
        fontSize: 15,
        fontWeight: '600',
    },


    // ========================================================
    // volver al login
    // ========================================================

    registerContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 16,
    },


    registerText: {
        color: '#4A5568',
        fontSize: 14,
    },


    registerLink: {
        color: '#557C55',
        fontWeight: 'bold',
        fontSize: 14,
    },


    // ========================================================
    // versión
    // ========================================================

    versionText: {
        color: '#A0AEC0',
        fontSize: 12,
        marginTop: 10,
    },

});
