import { useState } from "react";
export const useGoal = ({ text, user, priority, dueDate, setGoalsData }) => {
  const [goals, setGoals] = useState([]);
  const apiUrl = "http://localhost:5000/api/goals";
  const token = localStorage.getItem("token");
  const handleGoals = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      const newGoal = {
        text,
        user,
        priority,
        dueDate,
      };
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(newGoal),
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
      });
      // json = newGoal
      const json = await response.json();
      console.log(response, newGoal);
      if (response.ok) {
        setGoalsData((prevGoals) => [json, ...prevGoals]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { handleGoals, goals };
};
