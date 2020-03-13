import React, { FC } from "react";
import { Menu, Button, Container } from "semantic-ui-react";
interface IProps {
  handleOpenCreateActivity: () => void;
}

export const NavBar: FC<IProps> = ({ handleOpenCreateActivity }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header name="home">
          <img src="/assets/logo.png" alt="" style={{ marginRight: "10px" }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            onClick={() => handleOpenCreateActivity()}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
