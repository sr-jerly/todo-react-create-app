import React from "react";
import styled from "styled-components";
import { colors } from "./styles/colors";
import mq from "./styles/mq";

const TodoCounter =({total, compled})=>{
    return (
      <section>
        <Container  color={colors.text_color} bgColor={colors.primary.base}>
          <h6>{`You Have Completed  ${compled} of ${total} Tasks`}</h6>
        </Container>
      </section>
    );
}

export default TodoCounter;

const Container = styled.div`
    display: flex; 
    justify-content: center;
    box-shadow: 0 0.25rem 0.8125rem rgba(0,0,0,0.3);
    color: ${props => props.color};
    background-color: ${props => props.bgColor};
    width: 90%;
    margin: 0 auto;
    ${mq.md}{
      width: 100%;
    }
`;


