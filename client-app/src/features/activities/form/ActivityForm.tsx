import React, { FC, useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
import { v4 as uuid } from "uuid";
interface IProps {
  handleEditMode: (mode: boolean) => void;
  selectedActivity: IActivity;
  handleCreateActivity: (activity: IActivity) => void;
  handleUpdateActivity: (activity: IActivity) => void;
  submitting: boolean;
}

export const ActivityForm: FC<IProps> = ({
  handleEditMode,
  selectedActivity: initialFormState,
  handleCreateActivity,
  handleUpdateActivity,
  submitting
}) => {
  const handleEvent = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  const handlerEvent = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      console.log(newActivity);
      handleCreateActivity(newActivity);
    } else {
      handleUpdateActivity(activity);
    }
  };
  const initialForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };
  const [activity, setActivity] = useState<IActivity>(initialForm);
  return (
    <Segment clearing>
      <Form>
        <Form.Input
          name="title"
          onChange={handleEvent}
          placeholder="Title"
          value={activity.title}
        />
        <Form.TextArea
          rows={2}
          placeholder="Description"
          name="description"
          onChange={handleEvent}
          value={activity.description}
        />
        <Form.Input
          type="datetime-local"
          name="date"
          onChange={handleEvent}
          value={activity.date}
        />
        <Form.Input
          placeholder="Category"
          name="category"
          onChange={handleEvent}
          value={activity.category}
        />
        <Form.Input
          placeholder="City"
          name="city"
          onChange={handleEvent}
          value={activity.city}
        />
        <Form.Input
          placeholder="Venue"
          name="venue"
          onChange={handleEvent}
          value={activity.venue}
        />
        <Button
          loading={submitting}
          content="Submit"
          onClick={handlerEvent}
          type="submit"
          positive
          floated="right"
        />
        <Button
          content="Cancel"
          type="button"
          floated="right"
          onClick={() => handleEditMode(false)}
        />
      </Form>
    </Segment>
  );
};
