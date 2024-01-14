import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchCurrentUsers, fetchCurrentExcercises, postNewExcerciseRecord, putUser } from './webRequests/WebRequests';
import ViewsContainer from './views/ViewsContainer';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const [excerciseOptions, setExcerciseOptions] = useState(null);
  const [users, setUsers] = useState(null);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const updateUserProfileAndLoadPage = async () => {
      await updateUserProfileInDB(user);
      await fetchCurrentUsers((users) => {
        setUsers(users);
      });
      await fetchCurrentExcercises((options) => {
        setExcerciseOptions(options)
      });
    };

    if (isAuthenticated) {
      putUser(user);
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <div className="container">
        <LoginButton />
      </div>
    );
  } else {
    return (
      <div className="container">
        <LogoutButton />
        <div><ViewsContainer excerciseOptions={excerciseOptions} users={users} onExcerciseRecordAdded={postNewExcerciseRecord} /></div>
      </div>
    );
  }
}