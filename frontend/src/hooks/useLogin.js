import { useNavigate } from "react-router-dom";

export const useLogin = ({ username, password }) => {
  const navigate = useNavigate();
  const apiUrl = "http://localhost:5000/api/users/login";
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("id", data.user._id);
        localStorage.setItem("email", data.user.email)
        navigate("/");
      } else {
        const error = await response.json();
        console.log(error);
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { handleLogin };
};
