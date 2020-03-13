import React from "react";
import { Item, Button, Segment, Label } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
interface IProps {
  activities: IActivity[];
  handleEvent: (id: string) => void;
  handleDeleteActivity: (activity: IActivity) => void;
}
export const ActivityList: React.FC<IProps> = ({
  activities,
  handleEvent,
  handleDeleteActivity
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
                  content="Delete"
                  onClick={() => handleDeleteActivity(activity)}
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
