import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

// DATOS DE PRUEBA
const datosPlantas = {
  "1": {
    id: "1",
    nombre: "Orquídea Cattleya",
    tipo: "Decorativa",
    imagen: require("../../../assets/Cattleya.jpg"),
    apodo: "Flor de mayo",
    estado: "Saludable",
    proximoRiego: "En 2 días",

    cuidados: [
      {
        imagen: require("../../../assets/solamarillo.png"),
        label: "Luz",
        valor: "Indirecta",
      },
      {
        imagen: require("../../../assets/riegoazul.png"),
        label: "Riego",
        valor: "Moderado",
      },
      {
        imagen: require("../../../assets/fertilizacionverde.png"),
        label: "Abono",
        valor: "Cada 15 días",
      },
      {
        imagen: require("../../../assets/temperatura2.png"),
        label: "Temperatura",
        valor: "18-25 °C",
      },
    ],

    actividad: [
      { fecha: "15 oct", desc: "Riego exitoso" },
      { fecha: "6 nov", desc: "Fertilización aplicada" },
    ],

    plagas: [
      {
        id: "1",
        nombre: "Cochinilla",
        estado: "Activa",
        imagen: require("../../../assets/cochinilla.webp"),
        descripcion:
          "Pequeños insectos que se adhieren a las hojas y los tallos de la planta.",
        detectada: "3 nov 2024",
        zona: "Base de las hojas",
      },
      {
        id: "2",
        nombre: "Pulgón verde",
        estado: "Erradicada",
        imagen: require("../../../assets/pulgonverde.jpg"),
        descripcion:
          "Insectos pequeños que pueden afectar los brotes nuevos.",
        detectada: "20 sep 2024",
        zona: "Nuevos brotes",
      },
    ],

    tratamientos: [
      {
        id: "1",
        nombre: "Control intensivo",
        para: "Cochinilla",
        estado: "Activo",
        frecuencia: "Cada 3 días",
        notas:
          "Revisar las hojas y aplicar el tratamiento indicado cada tres días.",
      },
      {
        id: "2",
        nombre: "Protección preventiva",
        para: "Pulgón verde",
        estado: "Finalizado",
        frecuencia: "Cada 15 días",
        notas:
          "Inspeccionar los brotes para prevenir la aparición de nuevas plagas.",
      },
    ],
  },

  "2": {
    id: "2",
    nombre: "Narciso",
    tipo: "Decorativa",
    imagen: require("../../../assets/narciso.jpg"),
    apodo: "",
    estado: "Necesita riego",
    proximoRiego: "Hoy",
    cuidados: [],
    actividad: [],
    plagas: [],
    tratamientos: [],
  },

  "3": {
    id: "3",
    nombre: "Albahaca",
    tipo: "Culinaria",
    imagen: require("../../../assets/albahaca.jpg"),
    apodo: "",
    estado: "En crecimiento",
    proximoRiego: "Mañana",
    cuidados: [],
    actividad: [],
    plagas: [],
    tratamientos: [],
  },

  "4": {
    id: "4",
    nombre: "Valeriana",
    tipo: "Medicinal",
    imagen: require("../../../assets/valeriana.jpg"),
    apodo: "",
    estado: "Saludable",
    proximoRiego: "En 3 días",
    cuidados: [],
    actividad: [],
    plagas: [],
    tratamientos: [],
  },

  "5": {
    id: "5",
    nombre: "Pronto alivio",
    tipo: "Medicinal",
    imagen: require("../../../assets/prontoalivio.jpg"),
    apodo: "",
    estado: "Necesita riego",
    proximoRiego: "Hoy",
    cuidados: [],
    actividad: [],
    plagas: [],
    tratamientos: [],
  },

  "6": {
    id: "6",
    nombre: "Sábila",
    tipo: "Medicinal",
    imagen: require("../../../assets/sabila.jpg"),
    apodo: "",
    estado: "Saludable",
    proximoRiego: "En 5 días",
    cuidados: [],
    actividad: [],
    plagas: [],
    tratamientos: [],
  },

  "7": {
    id: "7",
    nombre: "Tomate de árbol",
    tipo: "Frutales",
    imagen: require("../../../assets/tomatearbol.webp"),
    apodo: "",
    estado: "En crecimiento",
    proximoRiego: "Mañana",
    cuidados: [],
    actividad: [],
    plagas: [],
    tratamientos: [],
  },

  "8": {
    id: "8",
    nombre: "Tomate",
    tipo: "Hortalizas",
    imagen: require("../../../assets/tomate.webp"),
    apodo: "",
    estado: "Necesita riego",
    proximoRiego: "Hoy",
    cuidados: [],
    actividad: [],
    plagas: [],
    tratamientos: [],
  },
};

function obtenerEstado(estado) {
  if (estado === "Necesita riego") {
    return {
      color: "#2C6FA6",
      fondo: "#E4EEF7",
      icono: "water",
      etiqueta: "Necesita riego",
    };
  }

  if (estado === "En crecimiento") {
    return {
      color: "#B4791F",
      fondo: "#FAEFDC",
      icono: "trending-up",
      etiqueta: "En crecimiento",
    };
  }

  return {
    color: "#3F7D3F",
    fondo: "#E7F3E4",
    icono: "checkmark-circle",
    etiqueta: "Saludable",
  };
}

export default function PlantaDetalle() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const plantaDetalle = datosPlantas[String(id)];

  const [mostrarActividad, setMostrarActividad] = useState(false);
  const [plagaSeleccionada, setPlagaSeleccionada] = useState(null);
  const [tratamientoSeleccionado, setTratamientoSeleccionado] =
    useState(null);

  if (!plantaDetalle) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <Text style={styles.error}>
          No encontramos la información de esta planta.
        </Text>

        <TouchableOpacity
          style={styles.modalCloseButton}
          onPress={() => router.back()}
        >
          <Text style={styles.modalCloseText}>Volver</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const estadoSalud = obtenerEstado(plantaDetalle.estado);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detalleScroll}
      >
        {/* CABECERA DEL DETALLE */}
        <View style={styles.detalleHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={22} color="#29432A" />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Text style={styles.eyebrow}>{plantaDetalle.tipo}</Text>
            <Text style={styles.detalleTitulo} numberOfLines={1}>
              {plantaDetalle.nombre}
            </Text>
          </View>
        </View>

        {/* FOTO Y ESTADO DE SALUD */}
        <View style={styles.detalleHero}>
          <Image
            source={plantaDetalle.imagen}
            style={styles.detalleHeroImg}
            resizeMode="cover"
          />

          <View
            style={[
              styles.gauge,
              { borderColor: estadoSalud.color },
            ]}
          >
            <View
              style={[
                styles.gaugeIconWrap,
                { backgroundColor: estadoSalud.fondo },
              ]}
            >
              <Ionicons
                name={estadoSalud.icono}
                size={16}
                color={estadoSalud.color}
              />
            </View>

            <View style={styles.gaugeTextWrap}>
              <Text
                style={[
                  styles.gaugeStatus,
                  { color: estadoSalud.color },
                ]}
                numberOfLines={1}
              >
                {estadoSalud.etiqueta}
              </Text>
            </View>
          </View>

          {!!plantaDetalle.apodo && (
            <View style={styles.heroCaption}>
              <Text style={styles.heroCaptionText}>
                “{plantaDetalle.apodo}”
              </Text>
            </View>
          )}
        </View>

        {/* GUÍA DE CUIDADOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Guía de cuidados específicos
          </Text>

          {plantaDetalle.cuidados.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cuidadosContainer}
            >
              {plantaDetalle.cuidados.map((c, i) => (
                <View key={i} style={styles.cuidadoCard}>
                  <Image
                    source={c.imagen}
                    style={styles.cuidadoImagen}
                    resizeMode="contain"
                  />

                  <Text style={styles.cuidadoLabel}>{c.label}</Text>
                  <Text style={styles.cuidadoValor}>{c.valor}</Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.emptyText}>
              Aún no hay cuidados registrados para esta planta.
            </Text>
          )}
        </View>

        {/* PRÓXIMO RIEGO Y ACTIVIDAD */}
        <View style={styles.section}>
          <View style={styles.activityCard}>
            <View style={styles.activityTop}>
              <View style={styles.activityLeft}>
                <View style={styles.dropCircle}>
                  <Ionicons
                    name="water-outline"
                    size={16}
                    color="#BFE0C1"
                  />
                </View>

                <View>
                  <Text style={styles.activityLabel}>Próximo riego</Text>
                  <Text style={styles.activityValue}>
                    {plantaDetalle.proximoRiego}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.activityToggle}
                onPress={() => setMostrarActividad(!mostrarActividad)}
              >
                <Text style={styles.activityToggleText}>Actividad</Text>
                <Ionicons
                  name={
                    mostrarActividad ? "chevron-up" : "chevron-down"
                  }
                  size={14}
                  color="#C4D2BC"
                />
              </TouchableOpacity>
            </View>

            {mostrarActividad && (
              <View style={styles.activityLog}>
                {plantaDetalle.actividad.length === 0 ? (
                  <Text style={styles.activityEmpty}>
                    Aún no hay registros.
                  </Text>
                ) : (
                  plantaDetalle.actividad.map((a, i) => (
                    <View key={i} style={styles.activityRow}>
                      <Text style={styles.activityDate}>{a.fecha}</Text>
                      <Text style={styles.activityDesc}>{a.desc}</Text>
                    </View>
                  ))
                )}
              </View>
            )}
          </View>
        </View>

        {/* PLAGAS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plagas</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.plagasContainer}
          >
            {plantaDetalle.plagas.map((plaga) => (
              <TouchableOpacity
                key={plaga.id}
                style={styles.pestCard}
                activeOpacity={0.8}
                onPress={() => setPlagaSeleccionada(plaga)}
              >
                <Image
                  source={plaga.imagen}
                  style={styles.pestImg}
                  resizeMode="cover"
                />

                <View style={styles.pestBody}>
                  <Text style={styles.pestName} numberOfLines={1}>
                    {plaga.nombre}
                  </Text>

                  <View
                    style={[
                      styles.pill,
                      plaga.estado === "Activa"
                        ? styles.pillActive
                        : styles.pillDone,
                    ]}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        plaga.estado === "Activa"
                          ? styles.pillTextActive
                          : styles.pillTextDone,
                      ]}
                    >
                      {plaga.estado}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.addCard}
              activeOpacity={0.7}
              onPress={() => router.push("/explore")}
            >
              <View style={styles.plusCircle}>
                <Ionicons name="add" size={18} color="#5F8A58" />
              </View>
              <Text style={styles.addCardText}>Agregar plaga</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* TRATAMIENTOS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tratamientos</Text>

          <View style={styles.listaTratamientos}>
            {plantaDetalle.tratamientos.map((tx) => (
              <TouchableOpacity
                key={tx.id}
                style={styles.txRow}
                activeOpacity={0.8}
                onPress={() => setTratamientoSeleccionado(tx)}
              >
                <View
                  style={[
                    styles.txIcon,
                    tx.estado === "Finalizado" && styles.txIconDone,
                  ]}
                >
                  <Ionicons
                    name={
                      tx.estado === "Finalizado"
                        ? "checkmark"
                        : "flask-outline"
                    }
                    size={17}
                    color={
                      tx.estado === "Finalizado"
                        ? "#7A8B74"
                        : "#5F8A58"
                    }
                  />
                </View>

                <View style={styles.txInfo}>
                  <Text style={styles.txName}>{tx.nombre}</Text>
                  <Text style={styles.txFor}>Para {tx.para}</Text>
                </View>

                <View
                  style={[
                    styles.pill,
                    tx.estado === "Activo"
                      ? styles.pillActive
                      : styles.pillFinished,
                  ]}
                >
                  <Text
                    style={[
                      styles.pillText,
                      tx.estado === "Activo"
                        ? styles.pillTextActive
                        : styles.pillTextFinished,
                    ]}
                  >
                    {tx.estado}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.addRow}
              activeOpacity={0.7}
              onPress={() => {}}
            >
              <View style={styles.plusCircle}>
                <Ionicons name="add" size={18} color="#5F8A58" />
              </View>
              <Text style={styles.addRowText}>Agregar tratamiento</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* SUBMODAL: DETALLE DE PLAGA */}
      <Modal
        visible={!!plagaSeleccionada}
        transparent
        animationType="fade"
        onRequestClose={() => setPlagaSeleccionada(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard2}>
            {plagaSeleccionada && (
              <>
                <Image
                  source={plagaSeleccionada.imagen}
                  style={styles.modalImg}
                  resizeMode="cover"
                />

                <View style={styles.modalBody}>
                  <View style={styles.modalHeadRow}>
                    <Text style={styles.modalTitle2}>
                      {plagaSeleccionada.nombre}
                    </Text>

                    <View
                      style={[
                        styles.pill,
                        plagaSeleccionada.estado === "Activa"
                          ? styles.pillActive
                          : styles.pillDone,
                      ]}
                    >
                      <Text
                        style={[
                          styles.pillText,
                          plagaSeleccionada.estado === "Activa"
                            ? styles.pillTextActive
                            : styles.pillTextDone,
                        ]}
                      >
                        {plagaSeleccionada.estado}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.modalDesc}>
                    {plagaSeleccionada.descripcion}
                  </Text>

                  <View style={styles.modalMetaRow}>
                    <Text style={styles.modalMetaLabel}>Detectada</Text>
                    <Text style={styles.modalMetaValue}>
                      {plagaSeleccionada.detectada}
                    </Text>
                  </View>

                  <View style={styles.modalMetaRow}>
                    <Text style={styles.modalMetaLabel}>
                      Zona afectada
                    </Text>
                    <Text style={styles.modalMetaValue}>
                      {plagaSeleccionada.zona}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => setPlagaSeleccionada(null)}
                  >
                    <Text style={styles.modalCloseText}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* SUBMODAL: DETALLE DE TRATAMIENTO */}
      <Modal
        visible={!!tratamientoSeleccionado}
        transparent
        animationType="fade"
        onRequestClose={() => setTratamientoSeleccionado(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard2}>
            {tratamientoSeleccionado && (
              <View style={[styles.modalBody, { paddingTop: 24 }]}>
                <View style={styles.modalHeadRow}>
                  <Text style={styles.modalTitle2}>
                    {tratamientoSeleccionado.nombre}
                  </Text>

                  <View
                    style={[
                      styles.pill,
                      tratamientoSeleccionado.estado === "Activo"
                        ? styles.pillActive
                        : styles.pillFinished,
                    ]}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        tratamientoSeleccionado.estado === "Activo"
                          ? styles.pillTextActive
                          : styles.pillTextFinished,
                      ]}
                    >
                      {tratamientoSeleccionado.estado}
                    </Text>
                  </View>
                </View>

                <Text style={styles.modalDesc}>
                  {tratamientoSeleccionado.notas}
                </Text>

                <View style={styles.modalMetaRow}>
                  <Text style={styles.modalMetaLabel}>Para</Text>
                  <Text style={styles.modalMetaValue}>
                    {tratamientoSeleccionado.para}
                  </Text>
                </View>

                <View style={styles.modalMetaRow}>
                  <Text style={styles.modalMetaLabel}>Frecuencia</Text>
                  <Text style={styles.modalMetaValue}>
                    {tratamientoSeleccionado.frecuencia}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setTratamientoSeleccionado(null)}
                >
                  <Text style={styles.modalCloseText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            )}
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

  headerInfo: {
    flex: 1,
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
    backgroundColor: "rgba(255,255,255,0.92)",
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

  sectionTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#29432A",
    marginBottom: 15,
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
    shadowOffset: { width: 0, height: 2 },
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
    backgroundColor: "#5B7D5C",
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
    flex: 1,
  },

  plagasContainer: {
    paddingRight: 1,
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

  pillActive: {
    backgroundColor: "#FBEDED",
  },

  pillTextActive: {
    color: "#B14A4A",
  },

  pillDone: {
    backgroundColor: "#EDF2E9",
  },

  pillTextDone: {
    color: "#5F8A58",
  },

  pillFinished: {
    backgroundColor: "#EEECE4",
  },

  pillTextFinished: {
    color: "#8A8A78",
  },

  listaTratamientos: {
    gap: 8,
  },

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

  emptyText: {
    fontSize: 13,
    lineHeight: 20,
    color: "#7A8B74",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
  },

  error: {
    color: "#344A35",
    fontSize: 16,
    padding: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(20,30,20,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  modalCard2: {
    width: "100%",
    maxWidth: 360,
    maxHeight: "85%",
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
    gap: 8,
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
    gap: 10,
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
    flexShrink: 1,
    textAlign: "right",
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
