
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { API_URL, API_BASE } from "../../services/api";

// construimos la url pública de la imagen
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

  return `http://api.florae.test/${rutaPublica}`;
};

// características circulares animadas
function Caracteristica({ icono, titulo, valor, retraso }) {
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
    <View className="flex-1 items-center">
      <Animated.View
        style={{
          opacity: opacidad,
          transform: [{ scale: escala }],
        }}
      >
        <View className="items-center">
          <View
            className="mb-[10px] h-[72px] w-[72px] items-center justify-center rounded-full border-[1.7px] border-[#CBD9C1]"
            style={{
              shadowColor: "#48643F",
              shadowOpacity: 0.08,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 3 },
              elevation: 2,
            }}
          >
            <Ionicons name={icono} size={27} color="#48643F" />
          </View>

          <Text className="mb-[5px] text-[15.5px] font-bold text-[#48643F]">
            {titulo}
          </Text>

          <Text className="text-center text-[14px] text-[#737C6E]">
            {valor}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

// botones con animación al presionar
function BotonAnimado({ children, onPress, className, style }) {
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
    <Animated.View style={{ transform: [{ scale: escala }] }}>
      <TouchableOpacity
        className={className}
        style={style}
        activeOpacity={0.85}
        onPressIn={presionar}
        onPressOut={soltar}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function DetallePlanta() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [planta, setPlanta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const imagenOpacidad = useRef(new Animated.Value(0)).current;
  const imagenEscala = useRef(new Animated.Value(0.94)).current;
  const contenidoOpacidad = useRef(new Animated.Value(0)).current;
  const contenidoY = useRef(new Animated.Value(25)).current;

  // consultamos la ficha técnica en laravel
  useEffect(() => {
    const consultarPlanta = async () => {
      try {
        setCargando(true);
        setError(false);

        const respuesta = await fetch(`${API_URL}/plant/${id}`);

        if (!respuesta.ok) {
          throw new Error("No se pudo consultar la planta");
        }

        const datos = await respuesta.json();

        // adaptamos los datos de la api al diseño actual
        setPlanta({
          nombre: datos.scientific_name,
          comun: datos.common_name,
          imagen: obtenerUrlImagen(datos),
          descripcion: datos.plant_description,
          origen: datos.origin,
          tipo: datos.type,
          clima: datos.climate ?? datos.clima ?? "No especificado",
          tamano: datos.size,
        });
      } catch (error) {
        console.log("error al consultar la ficha técnica:", error);
        setError(true);
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      consultarPlanta();
    }
  }, [id]);

  // animamos la imagen y el contenido cuando llega la información
  useEffect(() => {
    if (!planta) {
      return;
    }

    imagenOpacidad.setValue(0);
    imagenEscala.setValue(0.94);
    contenidoOpacidad.setValue(0);
    contenidoY.setValue(25);

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
  }, [planta]);

  // mostramos un mensaje mientras se carga la información
  if (cargando) {
    return (
      <SafeAreaView className="flex-1 bg-[#F8F7F3]">
        <Text className="p-5 text-[16px] text-[#344A35]">
          Cargando ficha técnica...
        </Text>
      </SafeAreaView>
    );
  }

  // mostramos un mensaje si ocurre un error
  if (error || !planta) {
    return (
      <SafeAreaView className="flex-1 bg-[#F8F7F3]">
        <Text className="p-5 text-[16px] text-[#344A35]">
          No pudimos cargar la información de esta planta.
        </Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Text className="p-5 text-[#48643F]">Volver</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F8F7F3]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        {/* fotografía de la planta */}
        <View className="relative h-[300px] w-full overflow-hidden rounded-bl-[28px] rounded-br-[28px] bg-[#E7E9E1]">
          {planta.imagen ? (
            <Animated.Image
              source={{ uri: planta.imagen }}
              style={{
                width: "100%",
                height: "100%",
                opacity: imagenOpacidad,
                transform: [{ scale: imagenEscala }],
              }}
              resizeMode="cover"
            />
          ) : (
            <View className="h-full w-full" />
          )}

          <TouchableOpacity
            className="absolute left-[17px] top-[15px] h-[45px] w-[45px] items-center justify-center rounded-full bg-white"
            style={{
              elevation: 4,
              shadowColor: "#000000",
              shadowOpacity: 0.12,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
            }}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#3F5D3F" />
          </TouchableOpacity>
        </View>

        {/* información de la planta */}
        <View className="px-[22px] pt-[25px]">
          <Animated.View
            style={{
              opacity: contenidoOpacidad,
              transform: [{ translateY: contenidoY }],
            }}
          >
            <Text className="text-left text-[25px] font-bold text-[#263D2D]">
              {planta.nombre}
            </Text>

            <Text className="mb-[22px] mt-[6px] text-left text-[19px] italic text-[#717171]">
              "{planta.comun}"
            </Text>

            {/* descripción */}
            <Text className="mb-[18px] text-[15.5px] leading-[24px] text-[#303130] font-nunito">
              {planta.descripcion || "Sin descripción disponible."}
            </Text>

            {/* origen en una sola línea */}
            <Text className="mb-[28px] text-[15.5px] text-[#626B60]">
              <Text className="font-bold text-[#48643F]">Origen: </Text>
              {planta.origen || "No especificado"}
            </Text>

            {/* características circulares */}
            <View className="mb-[25px]">
              <View className="flex-row items-start justify-between gap-[8px]">
                <Caracteristica
                  icono="leaf-outline"
                  titulo="Tipo"
                  valor={planta.tipo || "No especificado"}
                  retraso={250}
                />

                <Caracteristica
                  icono="sunny-outline"
                  titulo="Clima"
                  valor={planta.clima}
                  retraso={400}
                />

                <Caracteristica
                  icono="resize-outline"
                  titulo="Tamaño"
                  valor={planta.tamano || "No especificado"}
                  retraso={550}
                />
              </View>
            </View>

            {/* enlace a los cuidados detallados */}
            <TouchableOpacity
              className="mb-[22px] mt-[2px] flex-row items-center justify-center gap-[7px] self-center py-[8px]"
              activeOpacity={0.6}
              onPress={() =>
                router.push({
                  pathname: "/cuidados/cuidados",
                  params: { id: String(id) },
                })
              }
            >
              <Text className="text-[15px] font-medium text-[#657F60] underline">
                Ver cuidados detallados
              </Text>

              <Ionicons name="arrow-forward" size={16} color="#657F60" />
            </TouchableOpacity>

            {/* botón para añadir al jardín */}
            <BotonAnimado
              className="mb-[18px] min-h-[54px] flex-row items-center justify-center gap-[9px] rounded-[16px] bg-[#80A66F]"
              style={{
                elevation: 3,
                shadowColor: "#48643F",
                shadowOpacity: 0.15,
                shadowRadius: 7,
                shadowOffset: { width: 0, height: 3 },
              }}
              onPress={() => router.push("/(tabs)/jardin")}
            >
              <Ionicons
                name="add-circle-outline"
                size={23}
                color="#FFFFFF"
              />

              <Text className="text-[16px] font-bold text-white">
                Añadir a mi jardín
              </Text>
            </BotonAnimado>

            <View className="mb-[10px] flex-row items-center justify-center gap-[7px]">
              <Ionicons name="heart-outline" size={16} color="#8BAF72" />

              <Text className="text-[13px] italic text-[#879080]">
                Cada planta merece un cuidado especial
              </Text>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
