
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { API_URL, API_BASE } from "../../services/api";

// datos locales de las plagas
const plagas = [
    {
        id: "1",
        nombre: "Myzus persicae",
        comun: "Pulgón verde",
        imagen: require("../../assets/pulgonverde.jpg"),
    },
    {
        id: "2",
        nombre: "Planococcus citri",
        comun: "Cochinilla algodonosa",
        imagen: require("../../assets/cochinilla.webp"),
    },
    {
        id: "3",
        nombre: "Aphis fabae",
        comun: "Pulgón negro",
        imagen: require("../../assets/pulgonnegro.webp"),
    },
];

// obtenemos la url pública de la imagen
const obtenerUrlImagen = (planta) => {
    const ruta = planta.image_plant?.image;

    if (!ruta) {
        return null;
    }

    if (ruta.startsWith("http")) {
        return ruta;
    }

    const rutaLimpia = ruta.replace(/^\/+/, "");

    const rutaPublica = rutaLimpia.startsWith("storage/")
        ? rutaLimpia
        : `storage/${rutaLimpia}`;

    return `${API_BASE}/${rutaPublica}`;
};

export default function Explore() {
    const router = useRouter();

    const [seccion, setSeccion] = useState("plantas");
    const [plantas, setPlantas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    // consulta las plantas de la api
    async function cargarPlantas() {
        setCargando(true);
        setError("");

        try {
            const respuesta = await fetch(`${API_URL}/plant`);

            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }

            const datos = await respuesta.json();
            const lista = Array.isArray(datos) ? datos : datos.data || [];

            const plantasOrganizadas = lista.map((planta) => ({
                id: String(planta.id),
                nombre: planta.scientific_name || "Sin nombre científico",
                comun: planta.common_name || "Sin nombre común",
                imagen: obtenerUrlImagen(planta),
            }));

            setPlantas(plantasOrganizadas);
        } catch (e) {
            console.log("Error al cargar plantas:", e.message);

            setError(
                "No se pudieron cargar las plantas. Verifica la conexión con la API."
            );
        } finally {
            setCargando(false);
        }
    }

    // carga las plantas al abrir la pantalla
    useEffect(() => {
        cargarPlantas();
    }, []);

    // filtra por nombre común o científico
    const datosFiltrados = (
        seccion === "plantas" ? plantas : plagas
    ).filter((item) => {
        const texto = busqueda.toLowerCase().trim();

        return (
            item.nombre.toLowerCase().includes(texto) ||
            item.comun.toLowerCase().includes(texto)
        );
    });

    return (
        <SafeAreaView className="flex-1 bg-florae-background">
            <FlatList
                key={seccion}
                data={
                    seccion === "plantas" && cargando
                        ? []
                        : datosFiltrados
                }
                numColumns={2}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                }}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingTop: 8,
                    paddingBottom: 30,
                }}

                // encabezado y contenido superior
                ListHeaderComponent={
                    <>
                        {/* encabezado */}
                        <View className="flex-row items-center justify-between border-b border-florae-border pb-3 pt-2">
                            <View className="flex-row items-center">
                                <Image
                                    source={require("../../assets/logo.png")}
                                    style={{
                                        width: 45,
                                        height: 45,
                                    }}
                                    resizeMode="contain"
                                />

                                <View className="ml-2">
                                    <Text className="font-lora-bold text-[25px] text-florae-forest">
                                        Florae
                                    </Text>

                                    <Text className="font-nunito text-[12px] text-florae-secondary">
                                        Tu jardín inteligente
                                    </Text>
                                </View>
                            </View>

                            {/* notificaciones */}
                            <TouchableOpacity
                                className="h-[42px] w-[42px] items-center justify-center rounded-full border border-florae-border bg-white"
                                activeOpacity={0.8}
                            >
                                <Ionicons
                                    name="notifications-outline"
                                    size={23}
                                    color="#3F5D3F"
                                />

                                <View className="absolute right-2 top-2 h-[9px] w-[9px] rounded-full border-2 border-white bg-florae-active" />
                            </TouchableOpacity>
                        </View>

                        {/* título */}
                        <Text className="mb-5 mt-6 font-lora-bold text-[24px] text-florae-forest">
                            {seccion === "plantas"
                                ? "Encuentra y expande tu colección"
                                : "¿Qué plaga está afectando tu planta?"}
                        </Text>

                        {/* buscador */}
                        <View className="mb-5 h-[52px] flex-row items-center rounded-2xl border border-florae-border bg-white px-4">
                            <Ionicons
                                name="search"
                                size={21}
                                color="#8A9485"
                            />

                            <TextInput
                                placeholder="Busca por nombre común o científico"
                                placeholderTextColor="#9CA397"
                                className="ml-3 flex-1 font-nunito text-[14px] text-florae-text"
                                value={busqueda}
                                onChangeText={setBusqueda}
                            />
                        </View>

                        {/* botones de categorías */}
                        <View className="mb-5 flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => {
                                    setSeccion("plantas");
                                    setBusqueda("");
                                }}
                                activeOpacity={0.8}
                                className={`h-[48px] flex-1 flex-row items-center justify-center rounded-2xl border-2 ${
                                    seccion === "plantas"
                                        ? "border-florae-active bg-[#E8EFE3]"
                                        : "border-transparent bg-[#EEF3E7]"
                                }`}
                            >
                                <Ionicons
                                    name="leaf-outline"
                                    size={20}
                                    color="#3F5D3F"
                                />

                                <Text className="ml-2 font-nunito-bold text-[15px] text-florae-forest">
                                    Plantas
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setSeccion("plagas");
                                    setBusqueda("");
                                }}
                                activeOpacity={0.8}
                                className={`h-[48px] flex-1 flex-row items-center justify-center rounded-2xl border-2 ${
                                    seccion === "plagas"
                                        ? "border-[#C98278] bg-[#F5E4E1]"
                                        : "border-transparent bg-[#F8ECEA]"
                                }`}
                            >
                                <Ionicons
                                    name="bug-outline"
                                    size={20}
                                    color="#8B2E2E"
                                />

                                <Text className="ml-2 font-nunito-bold text-[15px] text-[#8B2E2E]">
                                    Plagas
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* estado de carga */}
                        {seccion === "plantas" && cargando && (
                            <View className="items-center py-8">
                                <ActivityIndicator
                                    size="large"
                                    color="#8BAF72"
                                />

                                <Text className="mt-3 font-nunito text-florae-secondary">
                                    Cargando plantas...
                                </Text>
                            </View>
                        )}

                        {/* mensaje de error */}
                        {seccion === "plantas" &&
                            !cargando &&
                            error !== "" && (
                                <View className="items-center py-6">
                                    <Text className="text-center font-nunito text-florae-secondary">
                                        {error}
                                    </Text>

                                    <TouchableOpacity
                                        onPress={cargarPlantas}
                                        activeOpacity={0.8}
                                        className="mt-3 rounded-xl bg-florae-pale px-5 py-3"
                                    >
                                        <Text className="font-nunito-bold text-florae-forest">
                                            Intentar de nuevo
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                        {/* cuando no hay resultados */}
                        {seccion === "plantas" &&
                            !cargando &&
                            error === "" &&
                            datosFiltrados.length === 0 && (
                                <Text className="py-5 text-center font-nunito text-florae-secondary">
                                    No se encontraron plantas.
                                </Text>
                            )}

                        {seccion === "plagas" &&
                            datosFiltrados.length === 0 && (
                                <Text className="py-5 text-center font-nunito text-florae-secondary">
                                    No se encontraron plagas.
                                </Text>
                            )}
                    </>
                }

                // tarjetas de plantas y plagas
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                            width: "48%",
                            backgroundColor: "#FFFFFF",
                            borderRadius: 10,
                            marginBottom: 18,
                            shadowColor: "#808080",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 6,
                            elevation: 4,
                            overflow: "hidden",
                        }}
                        onPress={() => {
                            if (seccion === "plantas") {
                                router.push({
                                    pathname: "/plantas/planta",
                                    params: { id: item.id },
                                });
                            } else {
                                router.push({
                                    pathname: "/plagas/plaga",
                                    params: { id: item.id },
                                });
                            }
                        }}
                    >
                        {/* imagen de la tarjeta */}
                        {seccion === "plantas" && item.imagen ? (
                            <Image
                                source={{ uri: item.imagen }}
                                style={{
                                    width: "100%",
                                    height: 120,
                                }}
                                resizeMode="cover"
                            />
                        ) : seccion === "plagas" ? (
                            <Image
                                source={item.imagen}
                                style={{
                                    width: "100%",
                                    height: 120,
                                }}
                                resizeMode="cover"
                            />
                        ) : (
                            <View
                                style={{
                                    width: "100%",
                                    height: 120,
                                    backgroundColor: "#EEF3E7",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Ionicons
                                    name="leaf-outline"
                                    size={38}
                                    color="#8BAF72"
                                />
                            </View>
                        )}

                        {/* información de la tarjeta */}
                        <View
                            style={{
                                padding: 12,
                                minHeight: 65,
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                numberOfLines={2}
                                style={{
                                    fontSize: 15.5,
                                    fontWeight: "bold",
                                    color: "#102415",
                                }}
                            >
                                {item.nombre}
                            </Text>

                            <Text
                                numberOfLines={2}
                                style={{
                                    color: "#777777",
                                    fontStyle: "italic",
                                    marginTop: 4,
                                    fontSize: 15,
                                }}
                            >
                                {item.comun}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}
