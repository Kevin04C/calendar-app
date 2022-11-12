import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoadingAuth } from "../auth/components/LoadingAuth";
import { AuthRouter } from "../auth/router/AuthRouter";
import { CalendarRouter } from "../calendar/router/CalendarRouter";
import { useAuthStore } from "../hooks/useAuthStore";

export const AppRouter = () => {

  const { status, startCheckAuth} = useAuthStore();

  useEffect(() => {
    startCheckAuth();
  }, [])

  if(status === 'checking') {
    return (
      <LoadingAuth />
    )
  }
  

  return (
    <BrowserRouter>
      <Routes>
          {
            status === "not-authenticated" 
            ? <Route path="auth/*" element={<AuthRouter />}/>
            : <Route path="*" element={<CalendarRouter />}/>
          }
          <Route path="/*" element={<Navigate to="auth/login"/>}/>
      </Routes>
    </BrowserRouter>
  );
};
