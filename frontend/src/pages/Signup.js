// imports
import { useSignup } from "../hooks/useSignup";
import { useField } from "../hooks/useField";
import { useNavigate } from "react-router-dom";

// Signup component
const Signup = () => {
  // variables
  const navigate = useNavigate();
  const usernameInput = useField("text");
  const username = usernameInput.value;
  const emailInput = useField("email");
  const email = emailInput.value;
  const passwordInput = useField("password");
  const password = passwordInput.value;
  const dateOfBirthInput = useField("date");
  const dateOfBirth = dateOfBirthInput.value;
  const phoneNumberInput = useField("text");
  const phoneNumber = phoneNumberInput.value;
  const { handleSignup } = useSignup({
    username,
    email,
    password,
    dateOfBirth,
    phoneNumber,
  });
  console.log(dateOfBirth, phoneNumber);
  return (
    <form className="signup" onSubmit={handleSignup}>
      <h3>Sign Up</h3>
      <label>Username:</label>
      <input {...usernameInput} />
      <label>Email address:</label>
      <input {...emailInput} />
      <label>Password:</label>
      <input {...passwordInput} />
      <label>Date of birth:</label>
      <input {...dateOfBirthInput} />
      <label>Phone number:</label>
      <input {...phoneNumberInput} />
      <button>Sign up</button>
    </form>
  );
};

export default Signup;
