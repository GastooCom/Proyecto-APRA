import { useEffect, useRef } from "react";

function CameraComponent() {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => {
        console.error("No se pudo acceder a la cámara:", err);
      });
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Vista de Cámara</h2>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="640"
        height="480"
        style={{ borderRadius: "10px", boxShadow: "0 0 15px rgba(0,0,0,0.3)" }}
      />
    </div>
  );
}

export default CameraComponent;