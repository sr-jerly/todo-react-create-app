
import React, { Fragment,useEffect,useState } from "react";
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
import TodosResult from "../components/loanding/todo-result";
import { ReactSortable } from "react-sortablejs";




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
    closeModal,
    onChangeOrder
  } = useTodos();

  const [orderTodos, setOrderTodos] = useState([]);


  useEffect(() => {
    if(orderTodos.length > 0){
    return  onChangeOrder(orderTodos)
    }
  }, [orderTodos])

  return (
    <Fragment>
      <TodoHeaderUI>
        <GlobalStyle />
        <Header />

        <TodoCounter totalTodos={totalTodos} compledTodos={compledTodos} />

        <TodoSearch
          searchValue={searchValue}
          setSearch={setSearch}
          loading={loading}
        />
      </TodoHeaderUI>

      <TodoList>
        {error && <TodosError erro={error} />}   
        {loading && !error && <TodosLoading item={searchedTodos} />}
        {!loading && !searchedTodos.length && totalTodos ? (
          <TodosResult searchValue={searchValue} />
        ) : (
          !loading && !searchedTodos.length && <TodosEntry />
        )}
        {!loading &&
          !error &&(
            <ReactSortable  list={searchedTodos} setList={setOrderTodos} animation={200} >
         { 
          searchedTodos.map((item, index) => {
            return (
                  <TodoItem
                    key={index}
                    {...item}
                    onCompled={() => toggleCompleteTodos(item.id)}
                    onDelete={() => DeleteTodo(item.id)}
                  />
                );
              })}
            </ReactSortable>

          )
          }

        <ModalView>
          <TodoForm addTodo={addTodo} closeModal={closeModal} />
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
