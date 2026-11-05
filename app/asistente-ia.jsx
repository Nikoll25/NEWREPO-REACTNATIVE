
import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function AsistenteIA() {
    const router = useRouter();

    const [imagen, setImagen] = useState(null);
    const [pregunta, setPregunta] = useState("");
    const [estadoMascota, setEstadoMascota] = useState("feliz");

    // imágenes de la mascota según su expresión
    const mascotas = {
        feliz: require("../assets/mascota-florae-feliz.png"),
        regando: require("../assets/mascota-florae-regando.png"),
        preocupada: require("../assets/mascota-florae-preocupada.png"),
        celebrando: require("../assets/mascota-florae-celebrando.png"),
    };

    // seleccionar una foto de la galería
    const elegirDeGaleria = async () => {
        try {
            const permiso =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permiso.granted) {
                Alert.alert(
                    "Permiso necesario",
                    "Necesitamos acceso a tu galería para subir una foto."
                );
                return;
            }

            const resultado =
                await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ["images"],
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.7,
                });

            if (!resultado.canceled && resultado.assets?.length > 0) {
                setImagen(resultado.assets[0].uri);
                setEstadoMascota("preocupada");
            }
        } catch (error) {
            console.error("Error al seleccionar imagen:", error);

            Alert.alert(
                "Error",
                "No fue posible seleccionar la imagen."
            );
        }
    };

    // tomar una foto con la cámara
    const tomarFoto = async () => {
        try {
            const permiso =
                await ImagePicker.requestCameraPermissionsAsync();

            if (!permiso.granted) {
                Alert.alert(
                    "Permiso necesario",
                    "Necesitamos acceso a tu cámara para tomar una foto."
                );
                return;
            }

            const resultado =
                await ImagePicker.launchCameraAsync({
                    mediaTypes: ["images"],
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.7,
                });

            if (!resultado.canceled && resultado.assets?.length > 0) {
                setImagen(resultado.assets[0].uri);
                setEstadoMascota("preocupada");
            }
        } catch (error) {
            console.error("Error al tomar foto:", error);

            Alert.alert(
                "Error",
                "No fue posible tomar la fotografía."
            );
        }
    };

    // mostrar las opciones para agregar una foto
    const abrirOpcionesFoto = () => {
        if (Platform.OS === "web") {
            elegirDeGaleria();
            return;
        }

        Alert.alert(
            "Agregar foto",
            "¿De dónde quieres tomar la imagen?",
            [
                {
                    text: "Cámara",
                    onPress: tomarFoto,
                },
                {
                    text: "Galería",
                    onPress: elegirDeGaleria,
                },
                {
                    text: "Cancelar",
                    style: "cancel",
                },
            ]
        );
    };

    // quitar la foto seleccionada
    const quitarImagen = () => {
        setImagen(null);
        setEstadoMascota("feliz");
    };

    // enviar una pregunta al asistente
    const enviarPregunta = () => {
        if (!pregunta.trim() && !imagen) {
            Alert.alert(
                "Asistente IA",
                "Escribe una pregunta o agrega una foto de tu planta."
            );
            return;
        }

        setEstadoMascota("preocupada");

        Alert.alert(
            "Asistente IA 🌱",
            "Esta función estará disponible próximamente.\n\n" +
                "Aquí podrás recibir recomendaciones y diagnósticos " +
                "sobre el cuidado de tus plantas mediante inteligencia artificial.",
            [
                {
                    text: "Entendido",
                    onPress: () => {
                        setEstadoMascota("feliz");
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* encabezado */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.replace("/jardin")}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="#29432A"
                    />
                </TouchableOpacity>

                <View style={styles.headerTextContainer}>
                    <Text style={styles.title}>Asistente IA</Text>

                    <Text style={styles.subtitle}>
                        Tu compañera para cuidar tus plantas
                    </Text>
                </View>
            </View>

            {/* contenido del chat */}
            <ScrollView
                style={styles.chatScroll}
                contentContainerStyle={styles.chatContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* mascota */}
                <Image
                    source={mascotas[estadoMascota]}
                    style={styles.mascota}
                    resizeMode="contain"
                />

                <Text style={styles.saludo}>
                    {estadoMascota === "feliz" &&
                        "¡Hola! Soy Florae 🌱"}
                    {estadoMascota === "regando" &&
                        "¡Vamos a cuidar tu plantita!"}
                    {estadoMascota === "preocupada" &&
                        "Vamos a revisar qué sucede con tu planta."}
                    {estadoMascota === "celebrando" &&
                        "¡Excelente trabajo cuidando tus plantas!"}
                </Text>

                <Text style={styles.descripcion}>
                    Cuéntame qué le sucede a tu planta o adjunta una
                    fotografía para preparar tu consulta.
                </Text>

                {/* información de la foto seleccionada */}
                {imagen ? (
                    <View style={styles.previewContainer}>
                        <Image
                            source={{ uri: imagen }}
                            style={styles.previewImage}
                            resizeMode="cover"
                        />

                        <TouchableOpacity
                            style={styles.removeImageButton}
                            onPress={quitarImagen}
                        >
                            <Ionicons
                                name="close"
                                size={18}
                                color="#FFFFFF"
                            />
                        </TouchableOpacity>

                        <View style={styles.readyContainer}>
                            <Ionicons
                                name="checkmark-circle"
                                size={22}
                                color="#5F8A58"
                            />

                            <Text style={styles.readyText}>
                                Foto lista para analizar
                            </Text>
                        </View>

                        <Text style={styles.previewHint}>
                            La función de diagnóstico estará disponible
                            cuando conectes la inteligencia artificial.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.futureCard}>
                        <Ionicons
                            name="leaf-outline"
                            size={24}
                            color="#5F8A58"
                        />

                        <View style={styles.futureTextContainer}>
                            <Text style={styles.futureTitle}>
                                ¿En qué puedo ayudarte?
                            </Text>

                            <Text style={styles.futureText}>
                                • Identificar posibles plagas{"\n"}
                                • Revisar manchas en las hojas{"\n"}
                                • Consultar sobre riego y cuidados
                            </Text>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* barra para escribir y adjuntar fotos */}
            <View style={styles.inputBar}>
                <TouchableOpacity
                    style={styles.attachButton}
                    onPress={abrirOpcionesFoto}
                >
                    <Ionicons
                        name="camera-outline"
                        size={22}
                        color="#3F5D3F"
                    />
                </TouchableOpacity>

                <TextInput
                    placeholder="Escribe tu pregunta..."
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={pregunta}
                    onChangeText={setPregunta}
                    onFocus={() => {
                        if (!imagen) {
                            setEstadoMascota("feliz");
                        }
                    }}
                    onSubmitEditing={enviarPregunta}
                    returnKeyType="send"
                    multiline={false}
                />

                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={enviarPregunta}
                >
                    <Ionicons
                        name="send"
                        size={18}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F7F3",
    },

    // encabezado
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#E6EDE3",
        backgroundColor: "#F8F7F3",
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 2,
    },

    headerTextContainer: {
        flex: 1,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#29432A",
    },

    subtitle: {
        fontSize: 13,
        color: "#5F8A58",
        marginTop: 2,
    },

    // contenido del chat
    chatScroll: {
        flex: 1,
    },

    chatContent: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 24,
    },

    mascota: {
        width: 180,
        height: 180,
        marginBottom: 8,
    },

    saludo: {
        fontSize: 21,
        fontWeight: "700",
        color: "#29432A",
        textAlign: "center",
        marginBottom: 8,
    },

    descripcion: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        lineHeight: 21,
        maxWidth: 330,
        marginBottom: 22,
    },

    // tarjeta de información
    futureCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        maxWidth: 380,
        backgroundColor: "#EDF2E9",
        borderRadius: 16,
        padding: 16,
    },

    futureTextContainer: {
        flex: 1,
        marginLeft: 12,
    },

    futureTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#3F5D3F",
        marginBottom: 6,
    },

    futureText: {
        fontSize: 13,
        color: "#667466",
        lineHeight: 21,
    },

    // foto seleccionada
    previewContainer: {
        alignItems: "center",
        width: "100%",
    },

    previewImage: {
        width: 220,
        height: 220,
        borderRadius: 20,
    },

    removeImageButton: {
        position: "absolute",
        top: -8,
        right: 24,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#B14A4A",
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    },

    readyContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
    },

    readyText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#5F8A58",
        marginLeft: 6,
    },

    previewHint: {
        fontSize: 13,
        color: "#777",
        textAlign: "center",
        marginTop: 10,
        lineHeight: 18,
    },

    // barra de entrada
    inputBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 10,
        borderTopWidth: 1,
        borderTopColor: "#E6EDE3",
        backgroundColor: "#FFFFFF",
    },

    attachButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EDF2E9",
        justifyContent: "center",
        alignItems: "center",
    },

    input: {
        flex: 1,
        height: 44,
        backgroundColor: "#F1F3EE",
        borderRadius: 22,
        paddingHorizontal: 16,
        fontSize: 14,
        color: "#333",
    },

    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#3F5D3F",
        justifyContent: "center",
        alignItems: "center",
    },
});
