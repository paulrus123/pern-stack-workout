import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import UsersList from './UsersList';
import ExcercisesList from './ExcercisesList';
import ExerciseForm from '../components/ExcerciseForm';

export default function ViewsContainer({ excerciseOptions, users, onExcerciseRecordAdded}) {
  return (
    
    <div className="container">
        <div><UsersList users={users}/></div>
        <div><ExcercisesList excerciseOptions={excerciseOptions}/></div>
        <div><ExerciseForm OnAddRecord={onExcerciseRecordAdded} excerciseOptions={excerciseOptions}/></div>
    </div>
  );
}