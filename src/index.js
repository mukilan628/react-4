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
      text: "",
      createdTimeList: [],
      createdTime: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    //      createdTime: Date(Date.getTime()).toString()

    if (this.state.text.length) {
      // this.setState({
      //   createdTime: Date(Date.now()).toString()
      //});

      console.log(this.state.createdTime);
      this.setState(prevState => ({
        list: prevState.list.concat(this.state.text),
        text: "",
        createdTimeList: prevState.createdTimeList.concat(
          this.state.createdTime
        )
      }));
    }
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
    this.setState({
      createdTime: Date(Date.now())
        .toString()
        .slice(4, 25)
    });
  }

  removeItem(index) {
    const list = this.state.list;
    list.splice(index, 1);
    const createdTimeList = this.state.createdTimeList;
    createdTimeList.splice(index, 1);
    this.setState({ list, createdTimeList });
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
                type="text"
                className="form-control"
                value={this.state.text}
                onChange={e => this.handleChange(e)}
              />
              <button>Submit</button>
              <ol>
                {this.state.list.map((item, index) => {
                  return (
                    <li key={index}>
                      <Toast
                        show={item.length}
                        onClose={() => this.removeItem(index)}
                      >
                        <Toast.Header>
                          <strong>Note {index + 1}. </strong>
                          <small>
                            {"  Created         "}

                            {this.state.createdTimeList[index]}
                          </small>
                        </Toast.Header>
                        <Toast.Body className="mr-3 d-inline-block">
                          {item},{" "}
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
