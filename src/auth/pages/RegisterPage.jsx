import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useForm } from "../../hooks/useForm";
import { AlertField } from "../components/AlertField";

const initalFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const formValidations = {
  name: [(value) => value.length >= 2, 'El nombre debe de tener mínimo 2 caracteres'],
  email: [(value) => value.includes('@'), 'El correo debe ser válido'],
  password: [(value) =>  value.length >= 6, 'La contraseña debe tener mínimo 6 caracteres'],
  confirmPassword: [(value) =>  value.length >= 6, 'La contraseña debe tener mínimo 6 caracteres'],
}


export const RegisterPage = () => {
  const { startRegister, errorMessage } = useAuthStore();
  const { formState, handleInputChange, isFormValid, formValidation } = useForm(initalFormState, formValidations);
  const { name, email, password, confirmPassword } = formState;
  const {
    nameValid,
    emailValid,
    passwordValid,
    confirmPasswordValid
   } = formValidation;

  const onSubmit = (event) => {
    event.preventDefault();
    if(password !== confirmPassword) {
      Swal.fire("Error en registro", "Las contraseñas no coinciden",'error');
      return;
    }
    
    startRegister(formState);
    
  }

  useEffect(() => {
    if(!!errorMessage) {
      Swal.fire("Error en el registro", errorMessage, 'error');
      return;
    } 

  }, [errorMessage])
  


  const stylesForm = () => isFormValid ? null : {filter: 'grayscale(1)'}
  

  return (
    <div
      style={{backgroundColor: '#f8fafc'}}
    >
      <div
        className="container d-flex align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="col col-sm-10 col-md-6 col-lg-4 mx-auto border rounded p-4 bg-white">
          <h2 className="mb-4">Registro</h2>

          <form 
            className="mb-4"
            onSubmit={onSubmit}
          >
            <div className="mb-2">
              <label className="mb-2 text-secondary">Nombre</label>
              <input type="text" 
                placeholder="nombre" 
                className="form-control" 
                name="name"
                value={name}
                onChange={handleInputChange}  
              />
              <AlertField>{nameValid}</AlertField>
            </div>
            <div className="mb-2">
              <label className="mb-2 text-secondary">Correo</label>
              <input type="text" 
                placeholder="correo" 
                className="form-control" 
                name="email"
                value={email} 
                onChange={handleInputChange} 
              />
              <AlertField>{emailValid}</AlertField>

            </div>
            <div className="mb-2">
              <label className="mb-2 text-secondary">Contraseña</label>
              <input
                type="password"
                placeholder="contraseña"
                className="form-control"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <AlertField>{passwordValid}</AlertField>

            </div>
            <div className="mb-3">
              <label className="mb-2 text-secondary">Repetir contraseña</label>
              <input
                type="password"
                placeholder="contraseña"
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
              />
              <AlertField>{confirmPasswordValid}</AlertField>

            </div>

            <button 
              className="w-100 btn btn-primary" 
              type="submit"
              style={stylesForm()}
              disabled={!isFormValid}
              >
              Crear cuenta
            </button>
          </form>

          <div className="d-flex justify-content-between">
            <span>¿Ya tienes una cuenta?</span>
            <Link to="/auth/login">Iniciar Sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
