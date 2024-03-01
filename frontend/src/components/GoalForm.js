import { useGoal } from "../hooks/useGoal";
import { useField } from "../hooks/useField";

const Goals = ({ setGoalsData }) => {
  const apiUrl = "http://localhost:5000/api/goals";
  const textInput = useField("text");
  const text = textInput.value;
  const dueDateInput = useField("text");
  const dueDate = dueDateInput.value;
  const priorityInput = useField("text");
  const priority = priorityInput.value;
  const user = localStorage.getItem("username");
  const { handleGoals } = useGoal({
    text,
    user,
    priority,
    dueDate,
    setGoalsData,
  });

  return (
    <form className="create" onSubmit={handleGoals}>
      <h3>Add a New Goal</h3>

      <label>Text:</label>
      <input {...textInput} />
      <label>Due Date:</label>
      <input {...dueDateInput} />
      <label>Priority:</label>
      <input {...priorityInput} />
      <button>Add Goal</button>
    </form>
  );
};

export default Goals;
