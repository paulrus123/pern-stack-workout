import React, { useState } from 'react';

interface ExcerciseOption {
  excercise_id: string;
  excercise_name: string;
}

interface ExcerciseFormProps {
  OnAddRecord: (data: { session_id: string; excercise: string; reps: string; weight: string }) => void;
  excerciseOptions: ExcerciseOption[];
}

const ExcerciseForm: React.FC<ExcerciseFormProps> = ({  OnAddRecord, excerciseOptions  }) => {
  const [session_id, setSessionId] = useState('');
  const [excercise, setExcercise] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  const handleAddClick = () => {
    OnAddRecord({ session_id, excercise, reps, weight });
  };

  function mapList() {
    return excerciseOptions.map(option => {
        return <option key={option.excercise_id}>{option.excercise_name}</option>;
    })
  };
  
  return (
    <div>
      <div>
        <label>Session ID:</label>
        <input type="text" value={session_id} onChange={(e) => setSessionId(e.target.value)} />
      </div>
      <div>
        <label>Exercise:</label>
        <select value={excercise} onChange={(e) => setExcercise(e.target.value)}>
          <option value="">Select an excercise</option>
          { !excerciseOptions ? 
            (<option value = ""> nothing </option>) : 
            (mapList())
          }
        </select>
      </div>
      <div>
        <label>Number of Reps:</label>
        <input type="text" value={reps} onChange={(e) => setReps(e.target.value)} />
      </div>
      <div>
        <label>Weight:</label>
        <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>
      <button onClick={handleAddClick}>Add</button>
    </div>
  );
};

export default ExcerciseForm;