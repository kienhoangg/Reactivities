import React from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
import { ActivityList } from "./ActivityList";
import { ActivityDetail } from "./ActivityDetail";
import { ActivityForm } from "../form/ActivityForm";
interface IProps {
  activities: IActivity[];
  handleEvent: (id: string) => void;
  selectedActivity: IActivity | null;
  handleEditMode: (mode: boolean) => void;
  editMode: boolean;
  setSelectedActivity: (activity: IActivity | null) => void;
  handleCreateActivity: (activity: IActivity) => void;
  handleUpdateActivity: (activity: IActivity) => void;
  handleDeleteActivity: (activity: IActivity) => void;
}
export const ActivityDashboard: React.FC<IProps> = ({
  activities,
  handleEvent,
  selectedActivity,
  handleEditMode,
  editMode,
  setSelectedActivity,
  handleCreateActivity,
  handleUpdateActivity,
  handleDeleteActivity
}) => {
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <ActivityList
            activities={activities}
            handleEvent={handleEvent}
            handleDeleteActivity={handleDeleteActivity}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          {selectedActivity && !editMode && (
            <ActivityDetail
              selectedActivity={selectedActivity}
              handleEditMode={handleEditMode}
              setSelectedActivity={setSelectedActivity}
            />
          )}
          {editMode && (
            <ActivityForm
              key={(selectedActivity && selectedActivity.id) || 0}
              handleEditMode={handleEditMode}
              selectedActivity={selectedActivity!}
              handleCreateActivity={handleCreateActivity}
              handleUpdateActivity={handleUpdateActivity}
            />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};
