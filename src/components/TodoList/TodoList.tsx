import { useEffect, useState } from "react";
import "./TodoList.scss";
import { Todo } from "../Todo/Todo";
import { Priority, Status, TodoI, Action } from "../../types";
import { Modal } from "../Modal/Modal";
import { priorityArray, statusArray } from "../../pages/CreateTodoPage/const";
import { useForm } from "react-hook-form";

export const TodoList = () => {
  const [isNeedToRerender, setIsNeedToRerender] = useState(false);

  const [todoList, setTodoList] = useState<TodoI[]>([]);
  const [changeTodo, setChangeTodo] = useState(1);
  const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setisOpenUpdateModal] = useState(false);

  const [inputName, setInputName] = useState("");
  const [textareaDescription, setTextareaDescription] = useState("");

  const [inputStatus, setInputStatus] = useState<Status>(Status.NOT_STARTED);
  const [inputPriority, setInputPriority] = useState<Priority>(Priority.HIGH);

  useEffect(() => {
    const storedData = localStorage.getItem("todolist");
    if (storedData) {
      setTodoList(JSON.parse(storedData));
    } else {
      setTodoList([]);
    }
  }, [isNeedToRerender]);

  const handleClick = (id: number, modalType: Action) => {
    if (modalType == Action.DELETE) {
      setChangeTodo(id);
      setisOpenDeleteModal(true);
    } else {
      setChangeTodo(id);
      setisOpenUpdateModal(true);
    }
  };

  const handleChangeTodo = (action: Action) => {
    const newTodolist: TodoI[] = todoList.filter(
      (item: TodoI) => item.id !== changeTodo
    );

    if (action === Action.UPDATE) {
      const newTodo: TodoI = {
        id: Date.now(),
        name: inputName,
        description: textareaDescription,
        status: inputStatus,
        priority: inputPriority,
      };
      newTodolist.push(newTodo);

      localStorage.setItem("todolist", JSON.stringify(newTodolist));
    } else {
      localStorage.setItem("todolist", JSON.stringify(newTodolist));
      setTodoList(newTodolist);
      setisOpenDeleteModal(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formFunc = async () => {
    handleChangeTodo(Action.UPDATE);
    setisOpenUpdateModal(false);
    setIsNeedToRerender((e) => !e);
  };

  return (
    <div className="todolist">
      <Modal isOpen={isOpenDeleteModal}>
        <p className="modal__description">
          Вы действительно хотите удалить эту тудушку?
        </p>
        <div className="buttons">
          <button
            className="btn btn--cancel"
            type="button"
            onClick={() => setisOpenDeleteModal(false)}
          >
            Отмена
          </button>
          <button
            className="btn btn--agree"
            type="button"
            onClick={() => handleChangeTodo(Action.DELETE)}
          >
            Да, удалить
          </button>
        </div>
      </Modal>
      <Modal isOpen={isOpenUpdateModal}>
        <form
          className="create-todo__form"
          action="#"
          onSubmit={handleSubmit(formFunc)}
        >
          <label className="create-todo__inputs" htmlFor="inputName">
            <div className="create-todo__input-block">
              <p className="create-todo__help-text">
                Введите название тудушки:
              </p>
              <input
                className="create-todo__input"
                {...register("todoname", { required: true, minLength: 5 })}
                id="inputName"
                type="text"
                value={inputName}
                onChange={(event) => {
                  setInputName(event.target.value);
                }}
              />
            </div>
            {errors.todoname && (
              <p className="error--string">
                В названии тудушки должно быть не менее 5 символов.
              </p>
            )}{" "}
            <div className="create-todo__input-block">
              <p className="create-todo__help-text">
                Введите описание тудушки:
              </p>
              <textarea
                className="create-todo__textarea"
                {...register("todoDescription", {
                  required: true,
                  minLength: 10,
                })}
                rows={4}
                cols={2}
                id="textareaDescription"
                value={textareaDescription}
                onChange={(event) => {
                  setTextareaDescription(event.target.value);
                }}
              />
            </div>
            {errors.todoDescription && (
              <p className="error--string">
                Описание тудушки должно содержать минимум 10 символов.
              </p>
            )}
          </label>
          <div>
            <span>Выберите статус</span>

            <div className="create-todo__options">
              {statusArray.map((item) => (
                <span className="create-todo__block" key={item.label}>
                  <label htmlFor={item.value}>{item.label}</label>
                  <input
                    type="radio"
                    id={item.value}
                    name="status"
                    value={item.value}
                    checked={inputStatus === item.value}
                    onChange={() => {
                      setInputStatus(item.value);
                    }}
                  />
                </span>
              ))}
            </div>
          </div>
          <div>
            <span>Выберите приоритет тудушки:</span>
            <div className="create-todo__options">
              {priorityArray.map((item) => (
                <span className="create-todo__block" key={item.label}>
                  <label htmlFor={item.value}>{item.label}</label>
                  <input
                    type="radio"
                    id={item.value}
                    name="priority"
                    value={item.value}
                    checked={inputPriority === item.value}
                    onChange={() => {
                      setInputPriority(item.value);
                    }}
                  />
                </span>
              ))}
            </div>
          </div>
          <div className="buttons">
            <button
              className="btn btn--cancel"
              type="button"
              onClick={() => setisOpenUpdateModal(false)}
            >
              Отмена
            </button>
            <button className="btn btn--agree" type="submit">
              Изменить
            </button>
          </div>
        </form>
      </Modal>
      <ul className="todolist__list">
        {todoList.map((item) => (
          <li className="todolist__item" key={item.id}>
            <Todo todo={item} key={item.id} handleAgree={handleClick} />
          </li>
        ))}
      </ul>
    </div>
  );
};
