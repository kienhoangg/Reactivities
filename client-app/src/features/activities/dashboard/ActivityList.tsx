import React, { SyntheticEvent } from "react";
import { Item, Button, Segment, Label } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
interface IProps {
  activities: IActivity[];
  handleEvent: (id: string) => void;
  handleDeleteActivity: (
    event: SyntheticEvent<HTMLButtonElement>,
    activity: IActivity
  ) => void;
  submitting: boolean;
  target: string;
}
export const ActivityList: React.FC<IProps> = ({
  activities,
  handleEvent,
  handleDeleteActivity,
  submitting,
  target
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  content="View"
                  onClick={() => handleEvent(activity.id)}
                  color="blue"
                  floated="right"
                ></Button>
                <Button
                  loading={target === activity.id && submitting}
                  name={activity.id}
                  content="Delete"
                  onClick={event => handleDeleteActivity(event, activity)}
                  color="red"
                  floated="right"
                ></Button>
                <Label basic content={activity.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
