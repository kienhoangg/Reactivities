import React, { Component } from "react";
import { Header, List } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../../models/activity";

interface IState {
  activities: IActivity[];
}
class App extends Component<{}, IState> {
  state: IState = {
    activities: []
  };
  componentDidMount() {
    axios
      .get<IActivity[]>("http://localhost:5000/Activities")
      .then(response => {
        this.setState({
          activities: response.data
        });
      });
  }
  render() {
    return (
      <div>
        <Header as="h2" icon="users" content="Reactivities" />
        <List>
          {this.state.activities.map((value, index) => {
            return <List.Item key={index}>{value.title}</List.Item>;
          })}
        </List>
      </div>
    );
  }
}

export default App;
