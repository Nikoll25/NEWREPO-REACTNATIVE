
import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
    Image,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter, } from "expo-router";

const datosPlagas = {
    "1": {
        nombre: "Myzus persicae",
        comun: "Pulgón verde",
        imagen: require("../../assets/pulgonverde.jpg"),
        descripcion:
            "Es un insecto pequeño de color verde que se alimenta de la savia de las plantas. Suele encontrarse en los brotes jóvenes y en la parte inferior de las hojas. Cuando aparece en grandes cantidades, puede debilitar la planta, deformar sus hojas y favorecer la aparición de otros problemas.",
        sintomas: [
            "Hojas enrolladas o deformadas.",
            "Pequeños insectos verdes en los brotes.",
            "Hojas pegajosas por la presencia de melaza.",
            "Crecimiento lento y brotes debilitados.",
        ],
    },

    "2": {
        nombre: "Planococcus citri",
        comun: "Cochinilla algodonosa",
        imagen: require("../../assets/cochinilla.webp"),
        descripcion:
            "Es un insecto que se alimenta de la savia de las plantas y se caracteriza por una cubierta blanca de aspecto algodonoso. Suele esconderse en las uniones de las hojas, los tallos y otras zonas protegidas. Su presencia puede debilitar la planta y afectar su crecimiento.",
        sintomas: [
            "Manchas blancas con aspecto algodonoso.",
            "Hojas amarillentas o debilitadas.",
            "Superficie pegajosa por la melaza.",
            "Crecimiento reducido de la planta.",
        ],
    },

    "3": {
        nombre: "Aphis fabae",
        comun: "Pulgón negro",
        imagen: require("../../assets/pulgonnegro.webp"),
        descripcion:
            "Es un insecto pequeño de color oscuro que se agrupa en los brotes tiernos y en la parte inferior de las hojas. Se alimenta de la savia y puede provocar deformaciones en los tejidos jóvenes. Las infestaciones abundantes debilitan la planta y pueden dejar una sustancia pegajosa sobre sus hojas.",
        sintomas: [
            "Grupos de insectos negros en los brotes.",
            "Hojas enrolladas o deformadas.",
            "Hojas pegajosas por la melaza.",
            "Brotes débiles y crecimiento reducido.",
        ],
    },
};

// Síntoma con número dentro de un círculo animado
function Sintoma({ numero, texto, retraso }) {
    const escala = useRef(new Animated.Value(0.5)).current;
    const opacidad = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animacion = Animated.sequence([
            Animated.delay(retraso),
            Animated.parallel([
                Animated.spring(escala, {
                    toValue: 1,
                    friction: 6,
                    tension: 65,
                    useNativeDriver: true,
                }),
                Animated.timing(opacidad, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
        ]);

        animacion.start();

        return () => animacion.stop();
    }, []);


    return (
        <Animated.View
            style={[
                styles.sintoma,
                {
                    opacity: opacidad,
                    transform: [{ scale: escala }],
                },
            ]}
        >
            <View style={styles.circuloNumero}>
                <Text style={styles.numero}>
                    {numero}
                </Text>
            </View>

            <Text style={styles.textoSintoma}>
                {texto}
            </Text>
        </Animated.View>
    );
}

// Botón con animación al presionar
function BotonAnimado({ children, onPress, style }) {
    const escala = useRef(new Animated.Value(1)).current;

    function presionar() {
        Animated.spring(escala, {
            toValue: 0.96,
            friction: 5,
            useNativeDriver: true,
        }).start();
    }

    function soltar() {
        Animated.spring(escala, {
            toValue: 1,
            friction: 5,
            tension: 100,
            useNativeDriver: true,
        }).start();
    }

    return (
        <Animated.View
            style={{ transform: [{ scale: escala }] }}
        >
            <TouchableOpacity
                activeOpacity={0.85}
                onPressIn={presionar}
                onPressOut={soltar}
                onPress={onPress}
                style={style}
            >
                {children}
            </TouchableOpacity>
        </Animated.View>
    );
}

export default function DetallePlaga() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const plaga = datosPlagas[String(id)];

    const imagenOpacidad = useRef(
        new Animated.Value(0)
    ).current;

    const imagenEscala = useRef(
        new Animated.Value(0.94)
    ).current;

    const contenidoOpacidad = useRef(
        new Animated.Value(0)
    ).current;

    const contenidoY = useRef(
        new Animated.Value(25)
    ).current;

    useEffect(() => {
        const animacion = Animated.parallel([
            Animated.parallel([
                Animated.timing(imagenOpacidad, {
                    toValue: 1,
                    duration: 700,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),

                Animated.spring(imagenEscala, {
                    toValue: 1,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                }),
            ]),

            Animated.sequence([
                Animated.delay(180),

                Animated.parallel([
                    Animated.timing(contenidoOpacidad, {
                        toValue: 1,
                        duration: 650,
                        useNativeDriver: true,
                    }),

                    Animated.timing(contenidoY, {
                        toValue: 0,
                        duration: 650,
                        easing: Easing.out(Easing.cubic),
                        useNativeDriver: true,
                    }),
                ]),
            ]),
        ]);

        animacion.start();

        return () => animacion.stop();
    }, []);

    if (!plaga) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.error}>
                    No encontramos la información de esta plaga.
                </Text>

                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.volverTexto}>
                        Volver
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContenido}
            >
                {/* Fotografía */}
                <View style={styles.contenedorImagen}>
                    <Animated.Image
                        source={plaga.imagen}
                        style={[
                            styles.imagen,
                            {
                                opacity: imagenOpacidad,
                                transform: [
                                    { scale: imagenEscala },
                                ],
                            },
                        ]}
                        resizeMode="cover"
                    />

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color="#3F5D3F"
                        />
                    </TouchableOpacity>
                </View>

                {/* Información de la plaga */}
                <Animated.View
                    style={[
                        styles.contenido,
                        {
                            opacity: contenidoOpacidad,
                            transform: [
                                { translateY: contenidoY },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.titulo}>
                        {plaga.nombre}
                    </Text>

                    <Text style={styles.comun}>
                        "{plaga.comun}"
                    </Text>

                    {/* Descripción */}
                    <Text style={styles.descripcion}>
                        {plaga.descripcion}
                    </Text>

                    {/* Título de los síntomas */}
                    <View style={styles.seccion}>
                        <Text style={styles.tituloSeccion}>
                            Síntomas
                        </Text>
                        <View style={styles.divisor} />
                        <Text style={styles.textoAuxiliar}>
                            Identifica las señales que puede presentar tu planta.
                        </Text>

                        {/* Cuatro síntomas numerados */}
                        <View style={styles.sintomas}>
                            {plaga.sintomas.map((sintoma, index) => (
                                <Sintoma
                                    key={index}
                                    numero={index + 1}
                                    texto={sintoma}
                                    retraso={250 + index * 150}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Botón Añadir */}
                    {/* Botón Añadir */}
                    <BotonAnimado
                        style={styles.boton}
                        onPress={() => Alert.alert(
                            "Plaga añadida",
                            `${plaga.comun} se ha agregado correctamente.`
                        )
                        }
                    >
                        <Ionicons
                            name="add-circle-outline"
                            size={23}
                            color="#FFFFFF"
                        />

                        <Text style={styles.botonTexto}>
                            Añadir
                        </Text>
                    </BotonAnimado>

                    {/* Mensaje final */}
                    <View style={styles.mensajeFinal}>
                        <Ionicons
                            name="heart-outline"
                            size={16}
                            color="#8BAF72"
                        />

                        <Text style={styles.mensajeFinalTexto}>
                            Cada planta merece un cuidado especial
                        </Text>
                    </View>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F7F3",
    },

    scrollContenido: {
        paddingBottom: 25,
    },

    contenedorImagen: {
        height: 300,
        position: "relative",
        backgroundColor: "#E7E9E1",
        overflow: "hidden",
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },

    imagen: {
        width: "100%",
        height: "100%",
    },

    divisor: {
        height: 1,
        backgroundColor: "#DCE5D6",
        marginTop: 2,
        marginBottom: 22,
    },
    backButton: {
        position: "absolute",
        top: 15,
        left: 17,
        width: 45,
        height: 45,
        borderRadius: 23,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    contenido: {
        paddingHorizontal: 22,
        paddingTop: 25,
    },

    titulo: {
        fontSize: 25,
        fontWeight: "700",
        color: "#263D2D",
        textAlign: "left",
    },

    comun: {
        fontSize: 18,
        fontStyle: "italic",
        color: "#717171",
        textAlign: "left",
        marginTop: 6,
        marginBottom: 22,
    },

    descripcion: {
        fontSize: 14.5,
        lineHeight: 24,
        color: "#303130",
        marginBottom: 24,
        textAlign: "justify",
    },

    seccion: {
        marginBottom: 25,
    },

    tituloSeccion: {
        fontSize: 19,
        fontWeight: "700",
        color: "#2F4633",
        marginBottom: 8,
    },

    textoAuxiliar: {
        fontSize: 13,
        color: "#858D80",
        marginBottom: 19,
        lineHeight: 20,
    },

    sintomas: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "stretch",
    },

    sintoma: {
        width: "48%",
        minHeight: 145,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#a6a7a5",
        padding: 14,
        marginBottom: 14,
        alignItems: "center",
        justifyContent: "flex-start",
        shadowColor: "#808080",
        shadowOpacity: 0.12,
        shadowRadius: 7,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 3,
    },

    circuloNumero: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#E5EEDC",
        borderWidth: 1.5,
        borderColor: "#8BAF72",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 12,
    },

    numero: {
        fontSize: 18,
        fontWeight: "700",
        color: "#48643F",
        textAlign: "center",
        includeFontPadding: false,
    },

    textoSintoma: {
        fontSize: 13,
        lineHeight: 20,
        color: "#525D4E",
        textAlign: "center",
    },

    boton: {
        flexDirection: "row",
        backgroundColor: "#80A66F",
        minHeight: 54,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        marginBottom: 18,
        elevation: 3,
        shadowColor: "#48643F",
        shadowOpacity: 0.15,
        shadowRadius: 7,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    botonTexto: {
        fontSize: 15,
        color: "#FFFFFF",
        fontWeight: "700",
    },

    mensajeFinal: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        marginBottom: 10,
    },

    mensajeFinalTexto: {
        color: "#879080",
        fontSize: 11,
        fontStyle: "italic",
    },

});
