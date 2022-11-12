import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/";
import { useAuthStore } from "../../hooks/useAuthStore";

const initalFormState = {
  email: '',
  password: '',
};

export const LoginPage = () => {

  const { startLogin, errorMessage } = useAuthStore();
  const { formState, email, password, handleInputChange} = useForm(initalFormState);

  const handleSubmit = (event) => {
    event.preventDefault();
    if(Object.values(formState).includes('')) {
      return Swal.fire("Campos vacios", "Rellene todo los campos", "error")
    }
    startLogin(formState);
  } 

  


  useEffect(() => {
      if(!!errorMessage) {
        Swal.fire('Error en la autenticación', `${errorMessage || 'Credenciales incorrectas' }`, 'error');
        return;
      }
  }, [errorMessage])
  


  return (
    <section
      style={{backgroundColor: '#f8fafc'}}
    >
      <div
        className="container d-flex align-items-center"
        style={{ height: "100vh"}}
      >
        <div className="col col-sm-10 col-md-6 col-lg-4 mx-auto border rounded p-4 bg-white">
          <h2 className="mb-4">Inicio sesión</h2>

          <form 
            className="mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label className="mb-2 text-secondary">Correo</label>
              <input
                type="text"
                placeholder="correo"
                className="form-control"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 text-secondary">Contraseña</label>
              <input
                type="password"
                placeholder="contraseña"
                className="form-control"
                name="password"
                value={password}
                onChange={handleInputChange}
                
                />
            </div>

            <button className="w-100 btn btn-primary" type="submit">
              Ingresar
            </button>
          </form>

          <div className="d-flex justify-content-between">
            <span>¿Aún no tienes cuenta?</span>
            <Link to="/auth/register">Crear cuenta</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
