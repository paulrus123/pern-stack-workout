import React from "react";

const Example = props => (
    <tr>
        <td>{props.example.name}</td>
        <td>{props.example.description}</td>
    </tr>
);

export default Example;