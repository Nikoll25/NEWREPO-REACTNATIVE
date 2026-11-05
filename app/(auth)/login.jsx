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
import { usuariosPrueba } from "../../data/usuariosPrueba";

// ============================================================
// VALIDACIÓN
// ============================================================

const validationSchema = Yup.object().shape({

    username: Yup.string() .required('El usuario es obligatorio'),

    password: Yup.string().required('La contraseña es obligatoria'),

});


// ============================================================
// COMPONENTE
// ============================================================

export default function LoginFlorae() {

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);


    // ========================================================
    // FORMIK
    // ========================================================

    const formik = useFormik({

        initialValues: {
            username: '',
            password: '',
        },

        validationSchema,

       onSubmit: async (values, { setSubmitting, resetForm }) => {
    try {
        // buscamos el usuario por su nombre o correo
        const usuario = usuariosPrueba.find(
            (usuario) =>
                usuario.correo.toLowerCase() ===
                    values.username.trim().toLowerCase() ||
                usuario.nombre.toLowerCase() ===
                    values.username.trim().toLowerCase()
        );

        // verificamos la contraseña
        if (!usuario || usuario.contrasena !== values.password) {
            Alert.alert(
                'Inicio de sesión',
                'El usuario o la contraseña son incorrectos.'
            );
            return;
        }

        // guardamos los datos de prueba y entramos a la aplicación
        resetForm();

        router.replace({
            pathname: '/(tabs)/explore',
            params: {
                usuarioId: String(usuario.id),
                nombreUsuario: usuario.nombre,
                rol: usuario.rol,
            },
        });

    } catch (error) {
        Alert.alert(
            'Error',
            'Ocurrió un problema al iniciar sesión. Intenta de nuevo.'
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

                    {/* FOTO DE FONDO */}

                    <Image
                        source={require('../../assets/imageninicio.png')}
                        style={styles.headerImage}
                        resizeMode="cover"
                    />


                    {/* CAPA OSCURA */}

                    <View style={styles.overlay} />


                    {/* LOGO + TÍTULO + SUBTÍTULO */}

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
                                source={require('../../assets/semilla.png')}
                                style={styles.welcomeImage}
                            />

                        </View>


                        {/* ==================================================
                            TÍTULO
                        ================================================== */}

                        <Text style={styles.welcomeTitle}>
                            ¡Bienvenido de nuevo!
                        </Text>


                        {/* ==================================================
                            SUBTÍTULO
                        ================================================== */}

                        <Text style={styles.welcomeSubtitle}>
                            Inicia sesión para continuar en Florae
                        </Text>


                        {/* ==================================================
                            USUARIO
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


                        {/* ERROR USUARIO */}

                        {formik.touched.username &&
                            formik.errors.username && (

                                <Text style={styles.errorText}>
                                    {formik.errors.username}
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


                            {/* MOSTRAR CONTRASEÑA */}

                            <TouchableOpacity
                                onPress={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
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


                        {/* ERROR CONTRASEÑA */}

                        {formik.touched.password &&
                            formik.errors.password && (

                                <Text style={styles.errorText}>
                                    {formik.errors.password}
                                </Text>

                            )}


                        {/* ==================================================
                            OLVIDASTE CONTRASEÑA
                        ================================================== */}

                        <TouchableOpacity
                            onPress={() =>
                                Alert.alert(
                                    'Recuperar contraseña',
                                    'Aquí podrás recuperar tu contraseña.'
                                )
                            }
                            style={styles.forgotPasswordContainer}
                        >

                            <Text style={styles.forgotPasswordText}>
                                ¿Olvidaste tu contraseña?
                            </Text>

                        </TouchableOpacity>


                        {/* ==================================================
                            INICIAR SESIÓN
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
                                    ? 'Cargando...'
                                    : 'Iniciar sesión'}

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
                                    'Aquí se conectará el inicio de sesión con Google.'
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
                                Iniciar sesión con Google
                            </Text>

                        </TouchableOpacity>


                        {/* ==================================================
                            REGISTRO
                        ================================================== */}

                        <View style={styles.registerContainer}>

                            <Text style={styles.registerText}>
                                ¿No tienes cuenta?{' '}
                            </Text>


                            <TouchableOpacity
                                onPress={() => {

                                    // Ir a register.jsx
                                    router.push('/register');

                                }}
                            >

                                <Text style={styles.registerLink}>
                                    Regístrate
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
    // HEADER
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
    // TARJETA
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
    // IMAGEN BIENVENIDA
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
    // TEXTOS
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
        marginBottom: 20,
    },


    // ========================================================
    // INPUTS
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
    // ERRORES
    // ========================================================

    errorText: {
        color: '#E53E3E',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginTop: 4,
        marginLeft: 4,
    },


    // ========================================================
    // CONTRASEÑA OLVIDADA
    // ========================================================

    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginTop: 8,
        marginBottom: 16,
    },


    forgotPasswordText: {
        fontSize: 13,
        color: '#2D3748',
        fontWeight: '500',
    },


    // ========================================================
    // BOTÓN LOGIN
    // ========================================================

    submitButton: {
        backgroundColor: '#557C55',
        borderRadius: 12,
        height: 48,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
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
    // SEPARADOR
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
    // GOOGLE
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
    // REGISTRO
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
    // VERSIÓN
    // ========================================================

    versionText: {
        color: '#A0AEC0',
        fontSize: 12,
        marginTop: 10,
    },

});
