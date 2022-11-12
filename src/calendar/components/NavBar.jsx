import { useAuthStore } from "../../hooks/useAuthStore";

export const NavBar = () => {

  const { startLogout, user } = useAuthStore();
  const nameCapitalize = `${user.name[0].toUpperCase()}${user.name.slice(1)}`

  return (
    <nav className="navbar navbar-dark bg-dark px-2 px-md-5">
        <span className="navbar-brand">
          <li className="fas fa-calendar-alt"></li>
          &nbsp; {nameCapitalize}
        </span>


        <button 
          className="btn btn-outline-danger px-3"
          onClick={startLogout}
        >
          <i className="fas fa-sign-out-alt me-2"></i>
          Salir
        </button>
    </nav>
  );
};
