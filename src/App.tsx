import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.scss";
import { MainPage } from "./pages/MainPage/MainPage";
import { CreateTodoPage } from "./pages/CreateTodoPage/CreateTodoPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="container">
          <nav className="navMenu">
            <Link className="navMenu__text" to={"/to-do-app"}>
              Главная
            </Link>
            <Link className="navMenu__text" to={"/to-do-app/create-todo"}>
              Создать Тудушку
            </Link>
          </nav>

          <main className="content">
            <h1 className="visually-hidden">Todo App</h1>
            <Routes>
              <Route path="/to-do-app" element={<MainPage />} />
              <Route
                path="/to-do-app/create-todo"
                element={<CreateTodoPage />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
