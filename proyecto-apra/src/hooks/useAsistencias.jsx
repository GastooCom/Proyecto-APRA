import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, doc, getDocs, onSnapshot, setDoc, query, orderBy, writeBatch, deleteDoc } from "firebase/firestore";

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

  const agregarAsistencia = async (nuevo) => {
    try {
      // obtener el mayor numero actual
      const q = query(collection(db, "asistencias"), orderBy("numero", "desc"));
      const snapshot = await getDocs(q);

      let siguienteNumero = 1;
      if (!snapshot.empty) {
        siguienteNumero = snapshot.docs[0].data().numero + 1;
      }

      const ref = doc(collection(db, "asistencias"));
      await setDoc(ref, {
        ...nuevo,
        numero: Number(siguienteNumero),
      });
    } catch (error) {
      console.error("Error al agregar asistencia:", error);
    }
  };

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

  const reordenarNumeros = async () => {
    try {
      const q = query(collection(db, "asistencias"), orderBy("numero", "asc"));
      const snapshot = await getDocs(q);

      const batch = writeBatch(db);
      snapshot.docs.forEach((docSnap, index) => {
        batch.update(docSnap.ref, { numero: index + 1 });
      });

      await batch.commit();
      console.log("Números reordenados correctamente");
    } catch (error) {
      console.error("Error al reordenar números:", error);
    }
  };

  const borrarAsistencia = async (id) => {
    try {
      await deleteDoc(doc(db, "asistencias", id));
      await reordenarNumeros();
    } catch (error) {
      console.error("Error al borrar asistencia:", error);
    }
  };

  return { datosAsistencia, loading, fetchAsistencias, agregarAsistencia, actualizarAsistencia, borrarAsistencia };
}