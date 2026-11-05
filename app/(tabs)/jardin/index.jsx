import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    Animated,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Modal,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const plantasIniciales = [
    {
        id: "1",
        nombre: "Orquídea Cattleya",
        tipo: "Decorativa",
        estado: "saludable",
        imagen: require("../../../assets/Cattleya.jpg"),
    },
    {
        id: "2",
        nombre: "Narciso",
        tipo: "Decorativa",
        estado: "riego",
        imagen: require("../../../assets/narciso.jpg"),
    },
    {
        id: "3",
        nombre: "Albahaca",
        tipo: "Culinaria",
        estado: "crecimiento",
        imagen: require("../../../assets/albahaca.jpg"),
    },
    {
        id: "4",
        nombre: "valeriana",
        tipo: "Medicinal",
        estado: "saludable",
        imagen: require("../../../assets/valeriana.jpg"),
    },
    {
        id: "5",
        nombre: "Pronto alivio",
        tipo: "Medicinal",
        estado: "riego",
        imagen: require("../../../assets/prontoalivio.jpg"),
    },
    {
        id: "6",
        nombre: "Sábila",
        tipo: "Medicinal",
        estado: "saludable",
        imagen: require("../../../assets/sabila.jpg"),
    },
    {
        id: "7",
        nombre: "Tomate de árbol",
        tipo: "Frutales",
        estado: "crecimiento",
        imagen: require("../../../assets/tomatearbol.webp"),
    },
    {
        id: "8",
        nombre: "Tomate",
        tipo: "Hortalizas",
        estado: "riego",
        imagen: require("../../../assets/tomate.webp"),
    },
];

const ESTADOS_PLANTA = {
    saludable: {
        etiqueta: "Saludable",
        icono: "checkmark-circle",
        color: "#3F7D3F",
        fondo: "#E7F3E4",
    },
    riego: {
        etiqueta: "Necesita riego",
        icono: "water",
        color: "#2C6FA6",
        fondo: "#E4EEF7",
    },
    crecimiento: {
        etiqueta: "En crecimiento",
        icono: "trending-up",
        color: "#B4791F",
        fondo: "#FAEFDC",
    },
};

export default function Jardin() {
    const router = useRouter();

    const [seccion, setSeccion] = useState("todas");
    const [busqueda, ] = useState("");

    // Modal de eliminar (igual que antes)
    const [modalVisible, setModalVisible] = useState(false);
    const [plantaAEliminar, setPlantaAEliminar] = useState(null);

    const [plantaDetalle, setPlantaDetalle] = useState(null);

    // movimiento suave de la mascota mientras espera
    const movimientoMascota = useRef(new Animated.Value(0)).current;
    const escalaMascota = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const animacionMovimiento = Animated.loop(
            Animated.sequence([
                Animated.timing(movimientoMascota, {
                    toValue: -4,
                    duration: 1400,
                    useNativeDriver: true,
                }),
                Animated.timing(movimientoMascota, {
                    toValue: 0,
                    duration: 1400,
                    useNativeDriver: true,
                }),
            ])
        );

        const animacionRespiracion = Animated.loop(
            Animated.sequence([
                Animated.timing(escalaMascota, {
                    toValue: 1.035,
                    duration: 1400,
                    useNativeDriver: false,
                }),
                Animated.timing(escalaMascota, {
                    toValue: 1,
                    duration: 1400,
                    useNativeDriver: false,
                }),
            ])
        );

        animacionMovimiento.start();
        animacionRespiracion.start();

        return () => {
            animacionMovimiento.stop();
            animacionRespiracion.stop();
        };
    }, [movimientoMascota, escalaMascota]);

    const plantasMostrar = plantasIniciales.filter((planta) => {
        const coincideCategoria =
            seccion === "todas" || planta.tipo === seccion;

        const coincideBusqueda = planta.nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase());

        return coincideCategoria && coincideBusqueda;
    });

    const abrirModalEliminar = (planta) => {
        setPlantaAEliminar(planta);
        setModalVisible(true);
    };

    const cerrarModalEliminar = () => {
        setModalVisible(false);
        setPlantaAEliminar(null);
    };

    const confirmarEliminar = () => {
        cerrarModalEliminar();
    };

    const filtros = [
        { id: "todas", nombre: "Todas", icono: "leaf-outline" },
        { id: "Decorativa", nombre: "Decorativa", icono: "flower-outline" },
        { id: "Culinaria", nombre: "Culinaria", icono: "restaurant-outline" },
        { id: "Medicinal", nombre: "Medicinal", icono: "flask-outline" },
        { id: "Frutales", nombre: "Frutales", icono: "nutrition-outline" },
        { id: "Hortalizas", nombre: "Hortalizas", icono: "leaf-outline" },
    ];

    // Estado visual (color/ícono/etiqueta) de la planta abierta en el detalle
    const estadoSalud = plantaDetalle
        ? ESTADOS_PLANTA[plantaDetalle.estado] || ESTADOS_PLANTA.saludable
        : ESTADOS_PLANTA.saludable;

    return (
        <SafeAreaView style={styles.container}>

            <FlatList
                data={plantasMostrar}
                numColumns={2}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.row}

                ListHeaderComponent={
                    <>
                        {/* HEADER */}

                        <View style={styles.header}>

                            <View>
                                <Text style={styles.title}>
                                    Mi Jardín
                                </Text>

                                <View style={styles.plantsInfo}>
                                    <Text style={styles.number}>
                                        {plantasIniciales.length}
                                    </Text>

                                    <Text style={styles.plantsText}>
                                        plantas
                                    </Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.notification}
                            >
                                <Ionicons
                                    name="notifications-outline"
                                    size={25}
                                    color="#48643F"
                                />

                                <View style={styles.notificationDot} />
                            </TouchableOpacity>

                        </View>

                        {/* BUSCADOR */}

                        <View style={styles.searchContainer}>
                            <Ionicons
                                name="search-outline"
                                size={22}
                                color="#777"
                            />

                            <TextInput
                                placeholder="Buscar en mi jardín..."
                                placeholderTextColor="#999"
                                style={styles.input}
                            />
                        </View>

                        {/* FILTROS */}

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.filters}
                        >
                            {filtros.map((filtro) => {

                                const activo =
                                    seccion === filtro.id;

                                return (
                                    <TouchableOpacity
                                        key={filtro.id}
                                        style={[
                                            styles.filter,
                                            activo &&
                                            styles.filterActivo,
                                        ]}
                                        onPress={() =>
                                            setSeccion(filtro.id)
                                        }
                                    >
                                        <Ionicons
                                            name={filtro.icono}
                                            size={18}
                                            color={
                                                activo
                                                    ? "#FFFFFF"
                                                    : "#3F5D3F"
                                            }
                                        />

                                        <Text
                                            style={[
                                                styles.filterText,
                                                activo &&
                                                styles.filterTextActivo,
                                            ]}
                                        >
                                            {filtro.nombre}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>

                        <View style={styles.filterLine} />

                        <Text style={styles.sectionTitle}>
                            {seccion === "todas"
                                ? "Todas mis plantas"
                                : `Plantas ${seccion.toLowerCase()}`}
                        </Text>
                    </>
                }

                renderItem={({ item }) => {

                    const estado =
                        ESTADOS_PLANTA[item.estado] || ESTADOS_PLANTA.saludable;

                    return (
                        <View style={styles.card}>

                            {/* IMAGEN */}

                            <View>
                                <Image
                                    source={item.imagen}
                                    style={styles.cardImage}
                                    resizeMode="cover"
                                />

                                <View
                                    style={[
                                        styles.estadoBadge,
                                        { backgroundColor: estado.fondo },
                                    ]}
                                >
                                    <Ionicons
                                        name={estado.icono}
                                        size={12}
                                        color={estado.color}
                                    />
                                    <Text
                                        style={[
                                            styles.estadoBadgeText,
                                            { color: estado.color },
                                        ]}
                                    >
                                        {estado.etiqueta}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.cardBody}>

                                <Text
                                    style={styles.cardTitle}
                                    numberOfLines={1}
                                >
                                    {item.nombre}
                                </Text>

                                <Text style={styles.cardType}>
                                    {item.tipo}
                                </Text>

                                <View style={styles.cardActions}>

                                    <TouchableOpacity
                                        style={styles.verMasButton}
                                        onPress={() =>
                                            router.push({
                                                pathname: "/jardin/detallePlanta",
                                                params: { id: item.id },
                                            })
                                        }
                                    >
                                        <Text style={styles.verMasText}>
                                            Ver más
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={
                                            styles.deleteIconButton
                                        }
                                        onPress={() =>
                                            abrirModalEliminar(item)
                                        }
                                    >
                                        <Ionicons
                                            name="trash-outline"
                                            size={18}
                                            color="#B14A4A"
                                        />
                                    </TouchableOpacity>

                                </View>

                            </View>

                        </View>
                    );
                }}

                ListEmptyComponent={
                    <View style={styles.empty}>

                        <Ionicons
                            name="leaf-outline"
                            size={45}
                            color="#A3B18A"
                        />

                        <Text style={styles.emptyTitle}>
                            No tienes plantas aquí
                        </Text>

                        <Text style={styles.emptyText}>
                            No encontramos plantas con esos
                            criterios.
                        </Text>

                    </View>
                }
            />

            {/* BOTÓN AGREGAR */}

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("/explore")}
            >
                <Ionicons
                    name="add"
                    size={34}
                    color="#FFFFFF"
                />
            </TouchableOpacity>

            {/* BOTÓN DE LA MASCOTA DE FLORAE */}

            <Animated.View
                style={[
                    styles.aiButtonAnimated,
                    {
                        transform: [
                            { translateY: movimientoMascota },
                            { scale: escalaMascota },
                        ],
                    },
                ]}
            >
                <TouchableOpacity
                    style={styles.aiButton}
                    activeOpacity={0.85}
                    accessibilityLabel="Abrir asistente de Florae"
                    onPress={() => router.push("/asistente-ia")}
                >
                    <Image
                        source={require("../../../assets/mascota-florae.png")}
                        style={styles.imagenMascota}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </Animated.View>

            {/* MODAL: ELIMINAR PLANTA (igual que antes) */}

            <Modal
                visible={modalVisible}
                transparent
                animationType="fade"
                onRequestClose={cerrarModalEliminar}
            >
                <View style={styles.modalOverlay}>

                    <View style={styles.modalCard}>

                        <View style={styles.modalAvatarWrapper}>

                            {plantaAEliminar && (
                                <Image
                                    source={plantaAEliminar.imagen}
                                    style={styles.modalAvatar}
                                    resizeMode="cover"
                                />
                            )}

                        </View>

                        <Text style={styles.modalTitle}>
                            ¿Eliminar esta planta?
                        </Text>

                        <Text style={styles.modalMessage}>
                            ¿Estás segura de que deseas eliminar
                            {" "}
                            “{plantaAEliminar?.nombre}”
                            {" "}
                            de tu Jardín?
                        </Text>

                        <View style={styles.modalButtonsRow}>

                            <TouchableOpacity
                                style={styles.modalCancelButton}
                                onPress={cerrarModalEliminar}
                            >
                                <Text style={styles.modalCancelText}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalDeleteButton}
                                onPress={confirmarEliminar}
                            >
                                <Text style={styles.modalDeleteText}>
                                    Eliminar
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8F7F3",
        paddingHorizontal: 16,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#E6EDE3",
    },

    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#29432A",
    },

    plantsInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
    },

    number: {
        fontSize: 19,
        fontWeight: "700",
        color: "#5F8A58",
    },

    plantsText: {
        fontSize: 17,
        color: "#5F8A58",
        marginLeft: 5,
        fontWeight: "600",
    },

    notification: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    notificationDot: {
        position: "absolute",
        top: 9,
        right: 9,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#79B851",
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },

    searchContainer: {
        height: 58,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 17,
        paddingHorizontal: 16,
        marginTop: 18,
        marginBottom: 15,
        elevation: 2,
    },

    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: "#333",
    },

    filters: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingRight: 16,
    },

    filter: {
        height: 42,
        paddingHorizontal: 13,
        borderRadius: 21,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        elevation: 1,
    },

    filterActivo: {
        backgroundColor: "#6F9562",
    },

    filterText: {
        marginLeft: 5,
        fontSize: 13,
        fontWeight: "600",
        color: "#3F5D3F",
    },

    filterTextActivo: {
        color: "#FFFFFF",
    },

    filterLine: {
        height: 1,
        backgroundColor: "#DDE4DA",
        marginTop: 10,
        marginBottom: 14,
    },

    sectionTitle: {
        fontSize: 21,
        fontWeight: "700",
        color: "#29432A",
        marginBottom: 15,
    },

    row: {
        justifyContent: "space-between",
    },

    card: {
        width: "48%",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        marginBottom: 18,
        overflow: "hidden",
        elevation: 3,
    },

    cardImage: {
        width: "100%",
        height: 145,
    },

    estadoBadge: {
        position: "absolute",
        top: 8,
        left: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
    },

    estadoBadgeText: {
        fontSize: 10,
        fontWeight: "700",
    },

    cardBody: {
        padding: 12,
    },

    cardTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#253A27",
    },

    cardType: {
        fontSize: 13,
        color: "#7A8B74",
        marginTop: 4,
    },

    cardActions: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        gap: 8,
    },

    verMasButton: {
        flex: 1,
        height: 34,
        borderRadius: 10,
        backgroundColor: "#EDF2E9",
        justifyContent: "center",
        alignItems: "center",
    },

    verMasText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#3F5D3F",
    },

    deleteIconButton: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: "#FBEDED",
        justifyContent: "center",
        alignItems: "center",
    },

    empty: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 50,
        paddingHorizontal: 30,
    },

    emptyTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#3F5D3F",
        marginTop: 10,
    },

    emptyText: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        marginTop: 6,
    },

    addButton: {
        position: "absolute",
        right: 20,
        bottom: 15,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#649A68",
        justifyContent: "center",
        alignItems: "center",
        elevation: 6,
    },

    aiButtonAnimated: {
        position: "absolute",
        right: 20,
        bottom: 82,
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: "#EAF1E5",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#48643F",
        shadowOpacity: 0.20,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 7,
    },

    aiButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#DCE9D4",
        borderWidth: 1,
        borderColor: "#B7CDAA",
        justifyContent: "center",
        alignItems: "center",
    },

    imagenMascota: {
        width: 58,
        height: 58,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(20, 30, 20, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },

    modalCard: {
        width: "100%",
        maxWidth: 340,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingTop: 44,
        paddingBottom: 24,
        paddingHorizontal: 22,
        alignItems: "center",
        elevation: 8,
    },

    modalAvatarWrapper: {
        position: "absolute",
        top: -38,
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: "#F8F7F3",
        borderWidth: 3,
        borderColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        elevation: 6,
    },

    modalAvatar: {
        width: "100%",
        height: "100%",
    },

    modalTitle: {
        fontSize: 19,
        fontWeight: "700",
        color: "#253A27",
        marginTop: 10,
        textAlign: "center",
    },

    modalMessage: {
        fontSize: 14,
        color: "#6A7F75",
        textAlign: "center",
        marginTop: 10,
        lineHeight: 20,
    },

    modalButtonsRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 22,
        width: "100%",
    },

    modalCancelButton: {
        flex: 1,
        height: 46,
        borderRadius: 12,
        backgroundColor: "#C4D2BC",
        justifyContent: "center",
        alignItems: "center",
    },

    modalCancelText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#29432A",
    },

    modalDeleteButton: {
        flex: 1,
        height: 46,
        borderRadius: 12,
        backgroundColor: "#B4514B",
        justifyContent: "center",
        alignItems: "center",
    },

    modalDeleteText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    // ---------------------------------------------------------------
    // MODAL DE DETALLE DE PLANTA ("Ver más")
    // ---------------------------------------------------------------

    detalleScroll: {
        paddingHorizontal: 0,
        paddingBottom: 40,
    },

    detalleHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingTop: 6,
        paddingBottom: 16,
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },

    eyebrow: {
        fontSize: 12,
        fontWeight: "700",
        color: "#5F8A58",
        textTransform: "uppercase",
    },

    detalleTitulo: {
        fontSize: 20,
        fontWeight: "700",
        color: "#29432A",
        marginTop: 2,
        maxWidth: 260,
    },

    detalleHero: {
        borderRadius: 20,
        overflow: "hidden",
        height: 230,
        elevation: 3,
    },

    detalleHeroImg: {
        width: "100%",
        height: "100%",
    },

    gauge: {
        position: "absolute",
        top: 12,
        right: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        maxWidth: 168,
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        borderWidth: 1.5,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
    },

    gaugeIconWrap: {
        width: 26,
        height: 26,
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center",
    },

    gaugeTextWrap: {
        flexShrink: 1,
    },

    gaugeStatus: {
        fontSize: 12,
        fontWeight: "700",
    },
    heroCaption: {
        position: "absolute",
        left: 14,
        bottom: 12,
    },

    heroCaptionText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },

    section: {
        marginTop: 22,
    },

    cuidadosContainer: {
        paddingRight: 1,
    },

    cuidadoCard: {
        width: 85,
        height: 93,
        backgroundColor: "#FFFFFF",
        borderRadius: 2,
        marginRight: 13,
        paddingVertical: 14,
        paddingHorizontal: 10,
        alignItems: "center",

        elevation: 2,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    cuidadoImagen: {
        width: 33,
        height: 33,
        marginBottom: 8,
    },

    cuidadoLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#111111",
        textAlign: "center",
    },

    cuidadoValor: {
        fontSize: 11,
        color: "#777777",
        marginTop: 2,
        textAlign: "center",
    },

    activityCard: {
        backgroundColor: "#5b7d5c",
        borderRadius: 18,
        padding: 16,
    },

    activityTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    activityLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    dropCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "rgba(255,255,255,0.12)",
        justifyContent: "center",
        alignItems: "center",
    },

    activityLabel: {
        fontSize: 11,
        color: "#B7C7AF",
    },

    activityValue: {
        fontSize: 15,
        fontWeight: "700",
        color: "#FFFFFF",
        marginTop: 1,
    },

    activityToggle: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    activityToggleText: {
        fontSize: 12,
        color: "#C4D2BC",
        fontWeight: "600",
    },

    activityLog: {
        marginTop: 14,
    },

    activityEmpty: {
        fontSize: 12,
        color: "#B7C7AF",
        paddingTop: 8,
    },

    activityRow: {
        flexDirection: "row",
        gap: 10,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.1)",
    },

    activityDate: {
        fontSize: 11,
        color: "#8FA694",
        width: 50,
    },

    activityDesc: {
        fontSize: 12,
        color: "#DCE3D9",
    },

    pestCard: {
        width: 122,
        marginRight: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        overflow: "hidden",
        elevation: 1,
    },

    pestImg: {
        width: "100%",
        height: 78,
    },

    pestBody: {
        padding: 9,
    },

    pestName: {
        fontSize: 13,
        fontWeight: "700",
        color: "#253A27",
    },

    addCard: {
        width: 92,
        height: 128,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: "#DDE4DA",
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
    },

    addCardText: {
        fontSize: 10.5,
        color: "#7A8B74",
        textAlign: "center",
        fontWeight: "600",
    },

    plusCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#EDF2E9",
        justifyContent: "center",
        alignItems: "center",
    },

    pill: {
        marginTop: 6,
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 20,
    },

    pillText: {
        fontSize: 10,
        fontWeight: "700",
    },

    pillActive: { backgroundColor: "#FBEDED" },
    pillTextActive: { color: "#B14A4A" },

    pillDone: { backgroundColor: "#EDF2E9" },
    pillTextDone: { color: "#5F8A58" },

    pillFinished: { backgroundColor: "#EEECE4" },
    pillTextFinished: { color: "#8A8A78" },

    txRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 11,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 12,
        elevation: 1,
    },

    txIcon: {
        width: 38,
        height: 38,
        borderRadius: 11,
        backgroundColor: "#EDF2E9",
        justifyContent: "center",
        alignItems: "center",
    },

    txIconDone: {
        backgroundColor: "#EEECE4",
    },

    txInfo: {
        flex: 1,
    },

    txName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#253A27",
    },

    txFor: {
        fontSize: 11,
        color: "#7A8B74",
        marginTop: 1,
    },

    addRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: "#DDE4DA",
        borderStyle: "dashed",
        padding: 12,
    },

    addRowText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#7A8B74",
    },

    // Submodales de plaga / tratamiento (dentro del modal de detalle)

    modalCard2: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        overflow: "hidden",
        elevation: 8,
    },

    modalImg: {
        width: "100%",
        height: 140,
    },

    modalBody: {
        padding: 20,
    },

    modalHeadRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    modalTitle2: {
        fontSize: 18,
        fontWeight: "700",
        color: "#253A27",
        flexShrink: 1,
        marginRight: 8,
    },

    modalDesc: {
        fontSize: 13,
        color: "#6A7F75",
        lineHeight: 19,
        marginTop: 10,
        marginBottom: 6,
    },

    modalMetaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: "#EDEDE6",
    },

    modalMetaLabel: {
        fontSize: 12,
        color: "#7A8B74",
    },

    modalMetaValue: {
        fontSize: 12,
        fontWeight: "700",
        color: "#253A27",
    },

    modalCloseButton: {
        marginTop: 16,
        backgroundColor: "#29432A",
        borderRadius: 12,
        paddingVertical: 13,
        alignItems: "center",
    },

    modalCloseText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 14,
    },

});