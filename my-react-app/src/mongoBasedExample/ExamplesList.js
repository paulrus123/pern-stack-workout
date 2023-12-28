import React, { Component } from 'react'
import axios from 'axios';
import Example from './Example';

export default class ExamplesList extends Component {
    constructor(props) {
        super(props);

        this.state = {examples: [], error: false};
    }

    componentDidMount() {
        this.updateTable();
    }

    updateTable() {
      axios.get('http://localhost:5000/examples/')
        .then(response => {
          this.setState({ examples: response.data, error:false });
        })
        .catch((error) => {
          console.log(error);
          this.setState({ examples: [], error: true });
        });
    }

    exampleList() {
        return this.state.examples.map(currentExample => {
            return <Example example={currentExample} key={currentExample._id} />;
        })
    }

    render() {
      const { examples, error } = this.state;

      return (
        <div>
          <h3>Example Table</h3>
          {error ? (
        <p>Error connecting to server. Please try again later.</p>
      ) : (
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              { this.exampleList() }
            </tbody>
          </table>)}
        </div>
      )
    }
}
;
