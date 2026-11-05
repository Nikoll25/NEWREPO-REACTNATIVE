
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { API_URL, API_BASE } from "../../services/api";

// imágenes locales para mostrar si la api no tiene una imagen
const imagenesLocales = {
  "1": require("../../assets/lengua.avif"),
  "2": require("../../assets/corona.avif"),
  "3": require("../../assets/toronjil.png"),
  "4": require("../../assets/lirio.jpg"),
  "5": require("../../assets/Cattleya.jpg"),
};

// obtiene la imagen de la planta desde la api
const obtenerUrlImagen = (planta) => {
  const ruta = planta?.image_plant?.image;

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

// obtiene la imagen correspondiente al tipo de cuidado
const obtenerImagenCuidado = (tipo) => {
  const tipoNormalizado = String(tipo || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (tipoNormalizado.includes("riego")) {
    return require("../../assets/gota.png");
  }

  if (
    tipoNormalizado.includes("luz") ||
    tipoNormalizado.includes("sol") ||
    tipoNormalizado.includes("iluminacion")
  ) {
    return require("../../assets/sol.png");
  }

  if (
    tipoNormalizado.includes("temperatura") ||
    tipoNormalizado.includes("clima")
  ) {
    return require("../../assets/temperatura.png");
  }

  if (
    tipoNormalizado.includes("fertil") ||
    tipoNormalizado.includes("abono")
  ) {
    return require("../../assets/Fertilizante.png");
  }

  return null;
};

// tarjeta animada para cada cuidado
function TarjetaCuidado({
  imagen,
  icono,
  titulo,
  descripcion,
  retraso = 0,
}) {
  const escala = useRef(new Animated.Value(0.9)).current;
  const opacidad = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animacion = Animated.sequence([
      Animated.delay(retraso),
      Animated.parallel([
        Animated.spring(escala, {
          toValue: 1,
          friction: 7,
          tension: 50,
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
      style={{
        opacity: opacidad,
        transform: [{ scale: escala }],
      }}
      className="w-[48.5%] mb-3"
    >
      <View
        className="min-h-[160px] w-full items-center rounded-[18px] border-[1.5px] border-[#D6D6D1] bg-[#F8F7F3] px-3 py-4"
        style={{
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <View className="mb-3 h-[58px] w-[58px] items-center justify-center rounded-full border-[1.5px] border-[#CBD9C1] bg-[#F8F7F3]">
          {imagen ? (
            <Image
              source={imagen}
              className="h-[30px] w-[30px]"
              resizeMode="contain"
            />
          ) : (
            <Ionicons
              name={icono || "leaf-outline"}
              size={25}
              color="#48643F"
            />
          )}
        </View>

        <Text className="mb-[9px] text-center text-[14px] font-bold text-[#344B31]">
          {titulo}
        </Text>

        <Text className="text-center text-[12px] leading-[19px] text-[#687064]">
          {descripcion || "Sin descripción registrada."}
        </Text>
      </View>
    </Animated.View>
  );
}

export default function Cuidados() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // guardamos la información que llega desde laravel
  const [planta, setPlanta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // valores para las animaciones de la pantalla
  const imagenOpacidad = useRef(new Animated.Value(0)).current;
  const imagenEscala = useRef(new Animated.Value(0.95)).current;
  const contenidoOpacidad = useRef(new Animated.Value(0)).current;
  const contenidoY = useRef(new Animated.Value(20)).current;

  // consultamos la planta y sus cuidados registrados
  useEffect(() => {
    let activo = true;

    const consultarCuidados = async () => {
      try {
        setCargando(true);
        setError("");
        setPlanta(null);

        const respuesta = await fetch(`${API_URL}/plant/${id}`);

        if (!respuesta.ok) {
          throw new Error("No se pudo consultar la planta.");
        }

        const datos = await respuesta.json();

        if (activo) {
          setPlanta(datos);
        }
      } catch (errorConsulta) {
        if (activo) {
          setError(
            "No fue posible cargar los cuidados. Verifica la conexión con la API."
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    if (id) {
      consultarCuidados();
    } else {
      setError("No se recibió el identificador de la planta.");
      setCargando(false);
    }

    return () => {
      activo = false;
    };
  }, [id]);

  // animamos la imagen y el contenido cuando llega la planta
  useEffect(() => {
    if (!planta) {
      return;
    }

    imagenOpacidad.setValue(0);
    imagenEscala.setValue(0.95);
    contenidoOpacidad.setValue(0);
    contenidoY.setValue(20);

    const animacion = Animated.parallel([
      Animated.parallel([
        Animated.timing(imagenOpacidad, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.spring(imagenEscala, {
          toValue: 1,
          friction: 8,
          tension: 45,
          useNativeDriver: true,
        }),
      ]),

      Animated.sequence([
        Animated.delay(150),
        Animated.parallel([
          Animated.timing(contenidoOpacidad, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),

          Animated.timing(contenidoY, {
            toValue: 0,
            duration: 600,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]);

    animacion.start();

    return () => animacion.stop();
  }, [planta]);

  // mostramos el indicador mientras se consultan los datos
  if (cargando) {
    return (
      <SafeAreaView className="flex-1 bg-[#F8F7F3]">
        <View className="flex-1 items-center justify-center px-[25px]">
          <ActivityIndicator size="large" color="#48643F" />

          <Text className="mt-[15px] text-center text-[14px] text-[#687064]">
            Cargando los cuidados de tu planta...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // mostramos un mensaje si ocurre un error
  if (error || !planta) {
    return (
      <SafeAreaView className="flex-1 bg-[#F8F7F3]">
        <View className="flex-1 items-center justify-center px-[25px]">
          <Ionicons
            name="leaf-outline"
            size={42}
            color="#48643F"
          />

          <Text className="pt-5 text-center text-[16px] leading-[23px] text-[#344A35]">
            {error || "No encontramos esta planta."}
          </Text>

          <TouchableOpacity
            className="mt-[15px] px-5 py-[10px]"
            onPress={() => router.back()}
          >
            <Text className="font-semibold text-[#48643F]">
              Volver
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // tomamos los cuidados relacionados que devuelve laravel
  const cuidados = Array.isArray(planta.plant_cares)
    ? planta.plant_cares
    : [];

  // usamos la imagen de la api o una imagen local de respaldo
  const imagenApi = obtenerUrlImagen(planta);
  const imagenLocal = imagenesLocales[String(id)];
  const imagenPlanta = imagenApi
    ? { uri: imagenApi }
    : imagenLocal;

  return (
    <SafeAreaView className="flex-1 bg-[#F8F7F3]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 25 }}
      >
        {/* fotografía de la planta */}
        <View className="relative h-[280px] overflow-hidden rounded-bl-[28px] rounded-br-[28px] bg-[#E7E9E1]">
          {imagenPlanta ? (
            <Animated.Image
              source={imagenPlanta}
              style={{
                width: "100%",
                height: "100%",
                opacity: imagenOpacidad,
                transform: [{ scale: imagenEscala }],
              }}
              resizeMode="cover"
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Ionicons
                name="leaf-outline"
                size={60}
                color="#8BAF72"
              />
            </View>
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
            <Ionicons
              name="arrow-back"
              size={24}
              color="#3F5D3F"
            />
          </TouchableOpacity>
        </View>

        {/* información y cuidados */}
        <Animated.View
          style={{
            opacity: contenidoOpacidad,
            transform: [{ translateY: contenidoY }],
          }}
        >
          <View className="px-[22px] pt-[25px]">
            {/* nombre de la planta obtenido de la api */}
            <Text className="text-center text-[20px] font-bold text-[#263D2D]">
              {planta.scientific_name || "Nombre científico no registrado"}
            </Text>

            <Text className="mb-[17px] mt-[6px] text-center text-[18px] italic text-[#788B75]">
              {planta.common_name || "Nombre común no registrado"}
            </Text>

            {/* título principal */}
            <View className="mb-[5px]">
              <Text className="mb-[15px] text-center text-[22px] font-bold text-[#2F4633]">
                Cuidados esenciales
              </Text>
            </View>

            {/* tarjetas generadas con los registros de plant_care */}
            <View className="mb-5">
              {cuidados.length > 0 ? (
                <View className="flex-row flex-wrap justify-between">
                  {cuidados.map((cuidado, indice) => {
                    const descripcion = [
                      cuidado.descripcion,
                      cuidado.frecuencia
                        ? `\n ${cuidado.frecuencia}`
                        : null,
                    ]
                      .filter(Boolean)
                      .join("\n\u200A");

                    return (
                      <TarjetaCuidado
                        key={cuidado.id ?? `${cuidado.tipo}-${indice}`}
                        imagen={obtenerImagenCuidado(cuidado.tipo)}
                        icono="leaf-outline"
                        titulo={cuidado.tipo || "Cuidado"}
                        descripcion={descripcion}
                        retraso={200 + indice * 150}
                      />
                    );
                  })}
                </View>
              ) : (
                <View className="mb-[15px] items-center justify-center rounded-2xl border border-[#D6D6D1] bg-white p-5">
                  <Ionicons
                    name="information-circle-outline"
                    size={25}
                    color="#48643F"
                  />

                  <Text className="mt-2 text-center text-[13px] leading-5 text-[#687064] font-nunito ">
                    Esta planta todavía no tiene cuidados registrados.
                  </Text>
                </View>
              )}
            </View>

            {/* advertencia guardada en la planta */}
            <Text className="mb-[15px] text-center text-[20px] font-bold text-[#2F4633]">
              Recomendaciones y advertencias
            </Text>

            <View className="mb-3 mt-[5px] flex-row items-start gap-[11px] rounded-2xl border border-[#EBD8C9] bg-[#FBF0E8] p-[14px]">
              <View className="h-[42px] w-[42px] items-center justify-center rounded-full bg-[#F5E1D4]">
                <Ionicons
                  name="warning-outline"
                  size={23}
                  color="#B86A4C"
                />
              </View>

              <View className="flex-1">
                <Text className="mb-[5px] text-[15px] font-bold text-[#92563F] font-nunito">
                  Advertencia
                </Text>

                <Text className="text-[14px] leading-5 text-[#685247] font-nunito">
                  {planta.warning ||
                    "No hay advertencias registradas para esta planta."}
                </Text>
              </View>
            </View>

            {/* recomendación guardada en la planta */}
            <View className="flex-row items-start gap-[11px] rounded-2xl border border-[#E2E8DA] bg-white p-[14px]">
              <View className="h-[42px] w-[42px] items-center justify-center rounded-full bg-[#E8EFE2]">
                <Ionicons
                  name="bulb-outline"
                  size={23}
                  color="#48643F"
                />
              </View>

              <View className="flex-1">
                <Text className="mb-[5px] text-[15px] font-bold text-[#48643F] font-nunito">
                  Recomendación
                </Text>

                <Text className="text-[14px] leading-5 text-[#495547] font-nunito">
                  {planta.recomendacion ||
                    "No hay recomendaciones registradas para esta planta."}
                </Text>
              </View>
            </View>

            {/* mensaje final */}
            <View className="mb-2 mt-[25px] flex-row items-center justify-center gap-[7px]">
              <Ionicons
                name="heart-outline"
                size={17}
                color="#8BAF72"
              />

              <Text className="text-[13px] italic text-[#879080]">
                Cada planta merece un cuidado especial
              </Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
