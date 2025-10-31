import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SolicitarPermisoNotificaciones = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const permisoGuardado = localStorage.getItem("permisoNotificaciones");

    // Solo pedir permiso si no se pidió antes
    if (!permisoGuardado && "Notification" in window) {
      Notification.requestPermission().then((permiso) => {
        localStorage.setItem("permisoNotificaciones", permiso);
        console.log("Permiso de notificaciones:", permiso);

        // Si el usuario bloquea, lo enviamos a la pantalla /permisosnoti
        if (permiso === "denied") {
          navigate("/permisosnoti");
        }
      });
    }
  }, [navigate]);

  return null; // No muestra nada en pantalla
};

export default SolicitarPermisoNotificaciones;
