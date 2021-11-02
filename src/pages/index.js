
import React, { Fragment } from "react";
import { useTodos } from "../hooks/useTodos";

import TodoCounter from "../components/todo-counter";
import TodoSearch from "../components/todo-search";
import TodoList from "../components/todo-list";
import TodoItem from "../components/todo-item";
import GlobalStyle from "../components/styles/globalStyles.js";
import styled, { css } from "styled-components";
import Header from "../components/header";
import { colors } from "../components/styles/colors";
import { TodoForm } from "../components/todoForm";
import { TodosError } from "../components/loanding/todo-error";
import { TodosLoading } from "../components/loanding/todo-loading";
import { TodosEntry } from "../components/loanding/todo-entry";
import FooterUI from "../components/footer";
import { TodoHeaderUI } from "../components/todo-header";



function App() {
  const {
    searchValue,
    setSearch,
    totalTodos, 
    compledTodos,
    error,
    loading,
    searchedTodos,
    toggleCompleteTodos,
    DeleteTodo,
    ModalView,
    openModal,
    addTodo, 
    closeModal
  } = useTodos();

  return (
    <Fragment>
        <TodoHeaderUI>
          <GlobalStyle />
          <Header />
          <TodoSearch  
          searchValue={searchValue} 
          setSearch={setSearch} 
          />
          <TodoCounter 
          totalTodos={totalTodos}
          compledTodos={compledTodos}
          />
      </TodoHeaderUI>


      <TodoList>
        {error && <TodosError erro={error} />}
        {loading && <TodosLoading item={searchedTodos} />}
        {!loading && !searchedTodos.length && searchValue.length ? (
          <Title
            color={colors.text.base}
          >{`There are no tasks with the name "${searchValue}" 😐`}</Title>
        ) : (
          !loading && !searchedTodos.length && <TodosEntry />
        )}

        {searchedTodos.map((item, index) => {
          return (
            <TodoItem
              key={index}
              {...item}
              onCompled={() => toggleCompleteTodos(item.id)}
              onDelete={() => DeleteTodo(item.id)}
            />
          );
        })}

        <ModalView>
          <TodoForm  addTodo={addTodo} closeModal={closeModal}/>
        </ModalView>
        <Container as="li">
          <Button
            onClick={openModal}
            bgColor={colors.primary.base}
            textColor={colors.text_cta}
            shadowColor={"rgba(115, 185, 255, 0.5)"}
            bgHover={colors.cta_hover}
          >
            Add new
          </Button>
        </Container>
      </TodoList>

  
        <FooterUI />
    </Fragment>
  );
};


export default App;


const Container = styled.section``;

const Button = styled.button`
  ${({ bgColor, textColor, shadowColor, bgHover }) => css`
    display: flex;
    margin: 5rem auto 0;
    text-align: center;
    background-color: ${bgColor};
    font-weight: bold;
    padding: 1rem;
    border-radius: 0.8rem;
    color: white;
    border: initial;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    &:focus {
      box-shadow: 0 0 0 0.32rem ${shadowColor};
    }
    &:hover {
      color: ${textColor};
      background-color: ${bgHover};
    }
  `}
`;

const Title = styled.h3`
  color: ${(props) => props.color};
`;
