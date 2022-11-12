

export const saveToken = (token) => {
  
  localStorage.setItem("token", token);
  localStorage.setItem("token-init", new Date().getTime());

}
