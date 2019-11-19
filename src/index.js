import ReactDOM from "react-dom";
import React, { Component } from "react";
import "./index.css";
//import Redux from "redux";
import "bootstrap/dist/css/bootstrap.min.css";

import Jumbotron from "react-bootstrap/Jumbotron";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      text: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState(prevState => ({
      list: prevState.list.concat(this.state.text),
      text: ""
    }));
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  removeItem(index) {
    const list = this.state.list;
    list.splice(index, 1);
    this.setState({ list });
  }

  render() {
    return (
      <div className="page">
        <div className="Header">
          <h1>TODO LIST</h1>
        </div>
        <Container className="p-3">
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                value={this.state.text}
                onChange={e => this.handleChange(e)}
              />
              <button>Add</button>
              <ol>
                {this.state.list.map((item, index) => {
                  return (
                    <li key={index}>
                      <Toast
                        show={item.length}
                        onClose={() => this.removeItem(index)}
                      >
                        <Toast.Header>
                          <strong>Note</strong>
                          <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body className="mr-3 d-inline-block">
                          {item}
                        </Toast.Body>
                      </Toast>
                    </li>
                  );
                })}
              </ol>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

ReactDOM.render(<Todo />, document.getElementById("root"));
