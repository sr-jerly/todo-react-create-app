import React from "react";
import styled from "styled-components";
import { IconTaks } from "./icons/icons";
import { colors } from "./styles/colors";
import mq from "./styles/mq";


const Header = () => {
  return (
    <section>
      <Container color={colors.text_color} bgColor={colors.primary.base}>
        <Title>Things to do</Title>
        <StylesIconTasks>
          <IconTaks />
        </StylesIconTasks>
      </Container>
    </section>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: 0 0.25rem 0.8125rem rgba(0, 0, 0, 0.3);
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
  ${mq.md}{
    justify-content: start;
  }
`;

const Title = styled.h1`

`;
const StylesIconTasks = styled.div`
  display: flex;
  align-items: center;
`;