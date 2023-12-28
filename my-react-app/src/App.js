import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
// import ExamplesList from "./mongoBasedExample/ExamplesList";
// import PostButton from './mongoBasedExample/PostButton';
// import ClearButton from './mongoBasedExample/ClearButton';
import UsersList from './views/UsersList';
import ExcercisesList from './views/ExcercisesList';
import ExerciseForm from './components/ExcerciseForm';
import WebRequests from './WebRequests';

export default function App() {

  const [excerciseOptions, setExcerciseOptions] = useState(null);
  const [users, setUsers] = useState(null);

  function HandleListLoaded(excercises) {
    setExcerciseOptions(excercises);
  };

  function HandleUsersLoaded(users) {
    setUsers(users);
  };

  const handleAddExcerciseRecord = async (record) => {
    console.log('Exercise Data:', record);
    try {
      const response = await fetch('http://localhost:5000/workout/singleSet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: record.session_id,
          excercise: record.excercise,
          reps: record.reps,
          weight: record.weight
        }),
      });

      if (response.ok) {
        console.log('POST request successful');
      } else {
        console.error('POST request failed');
      }
    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };

  return (
    <div className="container">
        <div><UsersList users={users}/></div>
        <div><ExcercisesList excerciseOptions={excerciseOptions}/></div>
        <div><ExerciseForm OnAdd={handleAddExcerciseRecord} excerciseOptions={excerciseOptions} setExcerciseOptions={setExcerciseOptions}/></div>
        <div><WebRequests OnFetchedUsers={HandleUsersLoaded} OnFetchedExcercises={HandleListLoaded}/></div>
    </div>
  );
}