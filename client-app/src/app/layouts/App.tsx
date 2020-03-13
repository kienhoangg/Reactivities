import React, { useState, useEffect, Fragment } from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import { IActivity } from "../../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/Activities")
      .then(response => {
        var activities: IActivity[] = [];
        response.data.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        setActivities(activities);
      });
  }, []);
  const handleEditMode = (mode: boolean) => {
    setEditMode(mode);
  };
  const handleEvent = (id: string) => {
    setSelectedActivity(activities.filter(x => x.id === id)[0]);
  };
  const handleOpenCreateActivity = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };
  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };
  const handleUpdateActivity = (activity: IActivity) => {
    setActivities([...activities.filter(x => x.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };
  const handleDeleteActivity = (activity: IActivity) => {
    setActivities([...activities.filter(x => x.id !== activity.id)]);
  };
  return (
    <Fragment>
      <NavBar handleOpenCreateActivity={handleOpenCreateActivity} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          handleEvent={handleEvent}
          selectedActivity={selectedActivity}
          handleEditMode={handleEditMode}
          editMode={editMode}
          setSelectedActivity={setSelectedActivity}
          handleUpdateActivity={handleUpdateActivity}
          handleCreateActivity={handleCreateActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
};

export default App;
