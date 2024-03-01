// components
import GoalDetails from "../components/GoalDetails";
import GoalForm from "../components/GoalForm";
import { useEffect, useState } from "react";

const Home = () => {
  const [goalsData, setGoalsData] = useState([]);
  const apiUrl = "http://localhost:5000/api/goals/";
  const user = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl + user, {
        headers: {
          'Authorization': 'Bearer ' + token
        },
    });
        const data = await response.json();
        setGoalsData(data);
        console.log(goalsData);
      } catch (error) {
        console.error("error: ", error);
      }
    };


    fetchData();
  }, []);
  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetch(apiUrl + itemId, {
        method: "DELETE",
        headers: {
          'Authorization': 'Bearer ' + token
        },
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
    const updatedItems = goalsData.filter((item) => {
      return item._id !== itemId;
    });
    setGoalsData(updatedItems);
  };
  return (
    <div className="home">
      <div className="goals">
        {goalsData.map((goal) => (
          <GoalDetails
            key={goal._id}
            {...goal}
            handleDelete={handleDeleteItem}
          />
        ))}
      </div>
      <GoalForm setGoalsData={setGoalsData} />
    </div>
  );
};

export default Home;
