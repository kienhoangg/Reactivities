import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
interface IProps {
  selectedActivity: IActivity;
  handleEditMode: (mode: boolean) => void;
  setSelectedActivity: (activity: IActivity | null) => void;
}
export const ActivityDetail: React.FC<IProps> = ({
  selectedActivity,
  handleEditMode,
  setSelectedActivity
}) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${selectedActivity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{selectedActivity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{selectedActivity.date}</span>
        </Card.Meta>
        <Card.Description>
          {selectedActivity.description}{" "}
          <div>
            {selectedActivity.city}, {selectedActivity.venue}
          </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => handleEditMode(true)}
            basic
            content="Edit"
            color="blue"
          ></Button>
          <Button
            onClick={() => setSelectedActivity(null)}
            basic
            content="Cancel"
            color="grey"
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
