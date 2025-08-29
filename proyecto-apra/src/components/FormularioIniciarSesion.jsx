import React from "react";
import "../css/FormularioIniciarSesion.css";
import google from "../Imagenes/gooogle.png";
import apple from "../Imagenes/images-removebg-preview.png";

const FormularioIniciarSesion = () => {
  // 📌 Login con Google
  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        usuario: result.user.displayName,
        email: result.user.email,
        foto: result.user.photoURL,
        uid: result.user.uid,
        rol: 'google_user'
      };
      setUser(userData);
      localStorage.setItem('usuario', JSON.stringify(userData));
      navigate('/');
    } catch (err) {
      console.error('Google Sign-In error:', err?.code, err?.message);

      // Fallback si el popup fue bloqueado
      if (err?.code === 'auth/popup-blocked' || err?.code === 'auth/cancelled-popup-request') {
        try {
          await signInWithRedirect(auth, provider);
          return;
        } catch (e2) {
          console.error('Redirect fallback error:', e2?.code, e2?.message);
        }
      }
      setError(`No se pudo iniciar sesión con Google (${err?.code || 'error-desconocido'}).`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ mt: 10, p: 4 }}>
@@ -68,10 +102,17 @@ const Login = ({ setUser }) => {
          value={credenciales.contrasena}
          onChange={(e) => setCredenciales({ ...credenciales, contrasena: e.target.value })}
        />
        <Box mt={2}>
        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Ingresar
          </Button>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
          >
            Ingresar con Google
          </Button>
        </Box>
      </Paper>
    </Container>
);
};
export default FormularioIniciarSesion;
