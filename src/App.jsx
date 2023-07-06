import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import List from "./components/List";

const data = [
  { id: 1, item: "Complete online JavsScript course", completed: true },
  { id: 2, item: "Jog around the park 3x", completed: false },
  { id: 3, item: "10 minutes meditation", completed: false },
  { id: 4, item: "Read for 1 hour", completed: false },
  { id: 5, item: "Pick up groceries", completed: false },
  { id: 6, item: "Complete Todo App on Frontend Mentor", completed: false },
]

export default function App() {
  const [todos, setTodos] = useState(data);
  const [filterOption, setFilterOption] = useState('All');


  return (
    <ThemeProvider>
        <Header/>
        <List
        todos={todos}
        setTodo={setTodos}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
        />
    </ThemeProvider>
  )
}
