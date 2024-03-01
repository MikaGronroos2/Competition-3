import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

const GoalDetails = ({ _id, text, user, priority, dueDate, handleDelete }) => {
  const handleDel = () => {
    handleDelete(_id);
  };
  return (
    <div className="goal-details">
      <h4>{text}</h4>
      <p>
        Created:{user}
        <br />
        Due Date:{dueDate}
        {/* {formatDistanceToNow(new Date(goal.dueDate), { addSuffix: true })} */}
        <br />
        Priority: {priority}
      </p>
      <span className="material-symbols-outlined" onClick={handleDel}>
        delete
      </span>
    </div>
  );
};

export default GoalDetails;
