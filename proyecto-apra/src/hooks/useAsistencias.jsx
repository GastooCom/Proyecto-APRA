import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export function useAsistencias() {
  const [datosAsistencia, setDatosAsistencia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "asistencias"));
        const data = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        console.log("Datos traídos de Firestore:", data);
        setDatosAsistencia(data);
      } catch (error) {
        console.error("Error al cargar asistencias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const actualizarAsistencia = async (id, campo, valor) => {
    const nuevosDatos = datosAsistencia.map((registro) =>
      registro.id === id ? { ...registro, [campo]: valor } : registro
    );
    setDatosAsistencia(nuevosDatos);

    const registroActualizado = nuevosDatos.find((r) => r.id === id);

    try {
      await setDoc(doc(db, "asistencias", id.toString()), registroActualizado);
    } catch (error) {
      console.error("Error al actualizar asistencia:", error);
    }
  };

  return { datosAsistencia, actualizarAsistencia, loading };
}
