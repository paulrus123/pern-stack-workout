import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import WebRequests from './WebRequests';
import ViewsContainer from './views/ViewsContainer';

export default function App() {
  const [excerciseOptions, setExcerciseOptions] = useState(null);
  const [users, setUsers] = useState(null);
  const[excerciseRecord, setExcerciseRecord] = useState(null);

  function HandleListLoaded(excercises) {
    setExcerciseOptions(excercises);
  };

  function HandleUsersLoaded(users) {
    setUsers(users);
  };

  return (
    <div className="container">
        <div><ViewsContainer excerciseOptions={excerciseOptions} users={users} onExcerciseRecordAdded={setExcerciseRecord}/></div>
        <div><WebRequests OnFetchedUsers={HandleUsersLoaded} OnFetchedExcercises={HandleListLoaded} excerciseRecord={excerciseRecord}/></div>
    </div>
  );
}