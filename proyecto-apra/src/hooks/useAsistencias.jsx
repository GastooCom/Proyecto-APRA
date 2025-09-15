import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, doc, getDocs, onSnapshot, setDoc, query, orderBy } from "firebase/firestore";

export function useAsistencias() {
/*
  function listenById(id, cb, errCb){
    const ref = doc(db, "profesores", id);
    return onSnapshot(ref, (d) => {
        cb(d.exists()?{id: d.id, ...d.data()} : null);
    }, errCb);
  }
*/
  const [datosAsistencia, setDatosAsistencia] = useState([]);
  const [loading, setLoading] = useState(true);
  /*
  const fetchAsistencias = async () => {
    try {
      const q = query(collection(db, "asistencias"), orderBy("numero", "asc"));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(), // incluye "numero"
      }));

      setDatosAsistencia(data);
    } catch (error) {
      console.error("Error al cargar asistencias:", error);
    } finally {
      setLoading(false);
    }
  };
  */
  useEffect(() => {
    const q = query(collection(db, "asistencias"), orderBy("numero", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setDatosAsistencia(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const actualizarAsistencia = async (id, campo, valor) => {
    const registroActualizado = datosAsistencia.find((r) => r.id === id);

    if (!registroActualizado) return;

    const nuevosDatos = { ...registroActualizado, [campo]: valor };

    try {
      await setDoc(doc(db, "asistencias", id.toString()), nuevosDatos);
    } catch (error) {
      console.error("Error al actualizar asistencia:", error);
    }
  };

  return { datosAsistencia, actualizarAsistencia, loading };
}
