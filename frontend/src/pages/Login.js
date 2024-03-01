// imports
import { useLogin } from "../hooks/useLogin";
import { useField } from "../hooks/useField";
import { useNavigate } from "react-router-dom";

//Login component
const Login = () => {
  // variables
  const navigate = useNavigate();
  const usernameInput = useField("text");
  const passwordInput = useField("password");
  const username = usernameInput.value;
  const password = passwordInput.value;
  const { handleLogin } = useLogin({ username, password });
  return (
    <form className="login" onSubmit={handleLogin}>
      <h3>Log In</h3>

      <label>Username:</label>
      <input {...usernameInput} />
      <label>Password:</label>
      <input {...passwordInput} />

      <button>Log in</button>
    </form>
  );
};

export default Login;
