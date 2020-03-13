import React, { SyntheticEvent } from "react";
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
  handleDeleteActivity: (
    event: SyntheticEvent<HTMLButtonElement>,
    activity: IActivity
  ) => void;
  submitting: boolean;
  target: string;
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
  handleDeleteActivity,
  submitting,
  target
}) => {
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <ActivityList
            activities={activities}
            handleEvent={handleEvent}
            handleDeleteActivity={handleDeleteActivity}
            submitting={submitting}
            target={target}
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
              submitting={submitting}
            />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};
