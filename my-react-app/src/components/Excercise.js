import React from "react";

const Excercise = props => (
    <tr>
        <td>{props.excercise.excercise_name}</td>
        <td>{props.excercise.excercise_description}</td>
    </tr>
);

export default Excercise;