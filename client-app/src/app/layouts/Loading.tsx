import React, { FC } from "react";
import { Loader, Dimmer } from "semantic-ui-react";

export const Loading: FC<{ inverted: boolean; content: string }> = ({
  inverted,
  content
}) => {
  return (
    <Dimmer active inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
};
