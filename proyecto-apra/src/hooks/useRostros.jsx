import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

export function useRostros() {
  const [rostros, setRostros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "rostros"), orderBy("nombre", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRostros(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const guardarRostro = async ({ nombre, curso, division, gmailPadres, fecha, estado, descriptor }) => {
    await addDoc(collection(db, "rostros"), {
      nombre,
      curso,
      division,
      gmailPadres: gmailPadres || "",
      fecha: fecha || "",
      estado: estado || "",
      descriptor: Array.from(descriptor || []),
    });
  };

  return { rostros, loading, guardarRostro };
}
