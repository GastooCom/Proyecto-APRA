import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const crearUsuario = async({ uid, usuario, email, rol }) => {
    try {
        await setDoc(doc(db, "usuarios", uid), {
            usuario,
            email,
            rol
        });
        console.log("Usuario guardado en Firestore ✅");
        return true;
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return false;
    }
};