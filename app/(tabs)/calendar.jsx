
import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Calendar, LocaleConfig } from "react-native-calendars";

// Configurar el calendario en español
LocaleConfig.locales.es = {
    monthNames: [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
    monthNamesShort: [
        "Ene.", "Feb.", "Mar.", "Abr.", "May.", "Jun.",
        "Jul.", "Ago.", "Sep.", "Oct.", "Nov.", "Dic."
    ],
    dayNames: [
        "Domingo", "Lunes", "Martes", "Miércoles",
        "Jueves", "Viernes", "Sábado"
    ],
    dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."]
};

LocaleConfig.defaultLocale = "es";

// Plantas y cuidados simulados
const plantas = [
    {
        id: "1",
        nombre: "Orquídea Cattleya",
        imagen: require("../../assets/Cattleya.jpg"),
        cuidados: {
            6: { tipo: "riego", tarea: "Regar la planta con cuidado." },
            15: { tipo: "cuidado", tarea: "Limpiar las hojas y retirar las secas." },
            20: { tipo: "riego", tarea: "Regar y aplicar fertilizante diluido." },
        },
    },
    {
        id: "2",
        nombre: "Narciso",
        imagen: require("../../assets/narciso.jpg"),
        cuidados: {
            10: { tipo: "riego", tarea: "Regar moderadamente, sin encharcar." },
        },
    },
    {
        id: "3",
        nombre: "Albahaca",
        imagen: require("../../assets/albahaca.jpg"),
        cuidados: {
            3: { tipo: "cuidado", tarea: "Retirar flores secas." },
            23: { tipo: "cuidado", tarea: "Podar los brotes superiores." },
        },
    },
    {
        id: "4",
        nombre: "Valeriana",
        imagen: require("../../assets/valeriana.jpg"),
        cuidados: {
            12: { tipo: "riego", tarea: "Regar sin encharcar el sustrato." },
        },
    },
    {
        id: "5",
        nombre: "Pronto alivio",
        imagen: require("../../assets/prontoalivio.jpg"),
        cuidados: {
            8: { tipo: "riego", tarea: "Regar la base de la planta." },
        },
    },
    {
        id: "6",
        nombre: "Sábila",
        imagen: require("../../assets/sabila.jpg"),
        cuidados: {
            18: { tipo: "cuidado", tarea: "Retirar las hojas secas." },
        },
    },
    {
        id: "7",
        nombre: "Tomate de árbol",
        imagen: require("../../assets/tomatearbol.webp"),
        cuidados: {
            5: { tipo: "riego", tarea: "Regar durante su crecimiento." },
            25: { tipo: "cuidado", tarea: "Revisar las ramas y los tutores." },
        },
    },
    {
        id: "8",
        nombre: "Tomate",
        imagen: require("../../assets/tomate.webp"),
        cuidados: {
            14: { tipo: "riego", tarea: "Regar la base de la planta." },
        },
    },
];

export default function CalendarioPlantas() {
    const hoy = new Date();
    const fechaHoy = [
        hoy.getFullYear(),
        String(hoy.getMonth() + 1).padStart(2, "0"),
        String(hoy.getDate()).padStart(2, "0"),
    ].join("-");

    const [plantaSeleccionada, setPlantaSeleccionada] = useState(plantas[0]);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(fechaHoy);
    const [tareasCompletadas, setTareasCompletadas] = useState([]);

    // Obtener el cuidado del día seleccionado
    const dia = Number(fechaSeleccionada.split("-")[2]);
    const cuidado = plantaSeleccionada.cuidados[dia];

    // Marcar en el calendario los días con cuidados de ejemplo
    const fechasMarcadas = {};

    Object.keys(plantaSeleccionada.cuidados).forEach((diaCuidado) => {
        const fecha = `${fechaSeleccionada.substring(0, 7)}-${String(diaCuidado).padStart(2, "0")}`;

        fechasMarcadas[fecha] = {
            marked: true,
            dotColor: "#5F8A58",
        };
    });

    // Resaltar la fecha seleccionada
    fechasMarcadas[fechaSeleccionada] = {
        ...fechasMarcadas[fechaSeleccionada],
        selected: true,
        selectedColor: "#6F9562",
        selectedTextColor: "#FFFFFF",
    };

    const tareaId = `${plantaSeleccionada.id}-${fechaSeleccionada}`;
    const tareaHecha = tareasCompletadas.includes(tareaId);

    const completarTarea = () => {
        if (!cuidado) return;

        if (!tareaHecha) {
            setTareasCompletadas([...tareasCompletadas, tareaId]);
        }

        Alert.alert(
            "Cuidado registrado",
            "La tarea se ha realizado."
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Encabezado */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Calendario</Text>
                        <Text style={styles.subtitle}>
                            {plantaSeleccionada.nombre}
                        </Text>
                    </View>

                    <View style={styles.notification}>
                        <Ionicons
                            name="notifications-outline"
                            size={25}
                            color="#48643F"
                        />
                    </View>
                </View>

                <View style={styles.encabezadoPlantas}>
                    <Text style={styles.sectionTitle}>Mis plantas</Text>

                    <View style={styles.mensajeDesliza}>
                        <Text style={styles.textoDesliza}>Desliza</Text>
                        <Ionicons name="arrow-forward" size={16} color="#6F9460" />
                    </View>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {plantas.map((planta) => (
                        <TouchableOpacity
                            key={planta.id}
                            style={styles.plantCard}
                            onPress={() => setPlantaSeleccionada(planta)}
                        >
                            <Image
                                source={planta.imagen}
                                style={[
                                    styles.plantImage,
                                    plantaSeleccionada.id === planta.id &&
                                    styles.plantImageActiva,
                                ]}
                            />
                            <Text style={styles.plantName} numberOfLines={1}>
                                {planta.nombre}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Calendario */}
                <View style={styles.calendarCard}>
                    <Calendar
                        current={fechaHoy}
                        onDayPress={(day) =>
                            setFechaSeleccionada(day.dateString)
                        }
                        firstDay={1}
                        enableSwipeMonths
                        markedDates={fechasMarcadas}
                        theme={{
                            calendarBackground: "#FFFFFF",
                            backgroundColor: "#FFFFFF",
                            textSectionTitleColor: "#7A8B74",
                            dayTextColor: "#29432A",
                            todayTextColor: "#5F8A58",
                            monthTextColor: "#29432A",
                            arrowColor: "#29432A",
                            textDisabledColor: "#D5DDD1",
                            textMonthFontWeight: "700",
                            textMonthFontSize: 17,
                        }}
                    />
                </View>

                {/* Cuidado del día */}
                <View style={styles.tasksSection}>
                    <Text style={styles.sectionTitle}>Cuidado del día</Text>

                    <View style={styles.taskCard}>
                        {cuidado ? (
                            <>
                                <Ionicons
                                    name={
                                        cuidado.tipo === "riego"
                                            ? "water"
                                            : "leaf"
                                    }
                                    size={28}
                                    color={
                                        cuidado.tipo === "riego"
                                            ? "#2C6FA6"
                                            : "#5F8A58"
                                    }
                                />

                                <View style={styles.taskInfo}>
                                    <Text style={styles.taskType}>
                                        {cuidado.tipo === "riego"
                                            ? "Riego"
                                            : "Mantenimiento"}
                                    </Text>

                                    <Text style={styles.taskText}>
                                        {cuidado.tarea}
                                    </Text>

                                    {tareaHecha && (
                                        <Text style={styles.completedText}>
                                            Tarea completada
                                        </Text>
                                    )}
                                </View>

                                <TouchableOpacity onPress={completarTarea}>
                                    <Ionicons
                                        name={
                                            tareaHecha
                                                ? "checkmark-circle"
                                                : "checkmark-circle-outline"
                                        }
                                        size={27}
                                        color="#5F8A58"
                                    />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <Text style={styles.emptyText}>
                                No hay cuidados programados para este día.
                            </Text>
                        )}
                    </View>
                </View>
            </ScrollView>
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
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#E6EDE3",
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#29432A",
    },
    subtitle: {
        color: "#5F8A58",
        marginTop: 4,
        fontWeight: "600",
    },
    encabezadoPlantas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    mensajeDesliza: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EAF1E5',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        gap: 6,
    },

    textoDesliza: {
        fontSize: 12,
        color: '#6F9460',
        fontWeight: '500',
    },
    notification: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#29432A",
        marginTop: 20,
        marginBottom: 12,
    },
    plantCard: {
        width: 82,
        alignItems: "center",
        marginRight: 10,
    },
    plantImage: {
        width: 76,
        height: 76,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: "transparent",
    },
    plantImageActiva: {
        borderColor: "#5F8A58",
    },
    plantName: {
        fontSize: 11,
        color: "#253A27",
        fontWeight: "600",
        textAlign: "center",
        marginTop: 6,
    },
    calendarCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        overflow: "hidden",
        marginTop: 20,
        elevation: 2,
    },
    tasksSection: {
        marginBottom: 30,
    },
    taskCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        gap: 12,
        elevation: 2,
    },
    taskInfo: {
        flex: 1,
    },
    taskType: {
        fontSize: 12,
        fontWeight: "700",
        color: "#5F8A58",
        marginBottom: 4,
    },
    taskText: {
        fontSize: 14,
        color: "#29432A",
        lineHeight: 20,
    },
    completedText: {
        fontSize: 12,
        color: "#5F8A58",
        marginTop: 5,
        fontWeight: "600",
    },
    emptyText: {
        fontSize: 14,
        color: "#7A8B74",
        lineHeight: 20,
    },
});
