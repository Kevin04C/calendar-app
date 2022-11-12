import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/CalendarApi";
import { clearToken, saveToken } from "../helpers";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";
import { useCalendarStore } from "./useCalendarStore";


export const useAuthStore = () => {
  
  const { status, user, errorMessage } = useSelector(state => state.auth);  
  const dispatch = useDispatch();

  const startLogin = async ({email, password}) => {
    dispatch(onChecking());
    
    try {
      const { data } = await calendarApi.post("/auth/", { email, password });
      
      saveToken(data.token);
      dispatch(onLogin({uid: data.uid, name: data.name}))

    } catch (error) {
      dispatch(onLogout(`${error.response?.data?.msg || 'Credenciales incorrectas'}`));
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10);
      
    }
  }

  const startRegister = async ({name, email, password}) => {

    try {
        const { data } = await calendarApi.post("/auth/new", {
          name, 
          email, 
          password
        });

        saveToken(data.token);
        
        dispatch(onLogin({uid: data.uid, name: data.name}))

    } catch (error) {

      const { response: { data } } = error;

      dispatch(onLogout(data?.msg || null));

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10);

    }
 }

  const startCheckAuth = async () => {
    const token = localStorage.getItem("token");
    try {

      if(!token) {
        dispatch(onLogout());
      }

      const { data } = await calendarApi.get("/auth/renew");
      saveToken(data.token);
      dispatch(onLogin({uid: data.uid, name: data.name}));

    } catch (error) {
      dispatch(onLogout(null));
      localStorage.removeItem("token");
      localStorage.removeItem("token-init");
    }
  }

  const startLogout = () => {
    clearToken();
    dispatch(onLogout(null));
    dispatch(onLogoutCalendar())
  }



  return {
    //PROPIEDADES
    status, 
    user, 
    errorMessage,

    //MÉTODOS
    startLogin,
    startRegister,
    startCheckAuth,
    startLogout
  }

}
