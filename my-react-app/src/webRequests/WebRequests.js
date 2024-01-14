const fetchCurrentUsers = async (OnFetchedUsers) => {
  try {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'workout/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const userData = await response.json();
      OnFetchedUsers(userData);
      console.log('GET USERS request successful');
    } else {
      OnFetchedUsers(null);
      console.error('GET USERS request failed');
    }
  } catch (error) {
    console.error('Error during GET USERS request:', error);
    OnFetchedUsers(null);
  }
};

const fetchCurrentExcercises = async (OnFetchedExcercises) => {
  try {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'workout/excercises', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log("Get EXCERCISES request successful");
      const excerciseData = await response.json();
      OnFetchedExcercises(excerciseData);
    } else {
      console.error('Error during GET EXCERCISES request');
    }
  } catch (error) {
    console.error('Error during GET EXCERCISES request:', error);
  }
};

const postNewExcerciseRecord = async (record) => {
  if (record == null) {
    console.log("Excercise Data null. Not posting.");
    return null;
  }

  try {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + 'workout/singleSet', {
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
      return response.json();
    } else {
      console.error('POST request failed');
      return null;
    }
  } catch (error) {
    console.error('Error during POST request:', error);
    return null;
  }
};

const putUser = async (user) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}workout/putUser`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update user in the database');
    }

    console.log('User updated successfully in the database');
  } catch (error) {
    console.error(error.message);
  }
};

export { fetchCurrentUsers, fetchCurrentExcercises, postNewExcerciseRecord, putUser };
