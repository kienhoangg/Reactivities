import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { IActivity } from "../../models/activity";
import { NavBar } from "../../features/nav/NavBar";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { Loading } from "./Loading";
const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState("");
  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        var activities: IActivity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          activities.push(activity);
        });
        setActivities(activities);
      })
      .then(() => setLoading(false));
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
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const handleUpdateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter(x => x.id !== activity.id),
          activity
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const handleDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    activity: IActivity
  ) => {
    setTarget(event.currentTarget.name);
    setSubmitting(true);
    agent.Activities.delete(activity.id)
      .then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id)]);
      })
      .then(() => setSubmitting(false));
  };
  if (loading)
    return <Loading inverted={false} content={"Loading Activities ..."} />;
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
          submitting={submitting}
          target={target}
        />
      </Container>
    </Fragment>
  );
};

export default App;
