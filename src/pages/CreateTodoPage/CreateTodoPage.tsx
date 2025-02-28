import { useState } from "react";
import { Priority, Status, TodoI } from "../../types";
import { priorityArray, statusArray } from "./const";
import { useForm } from "react-hook-form";
import "./CreateTodoPage.scss";

export const CreateTodoPage = () => {
  const [inputName, setInputName] = useState("");
  const [textareaDescription, setTextareaDescription] = useState("");

  const [inputStatus, setInputStatus] = useState<Status>(Status.NOT_STARTED);
  const [inputPriority, setInputPriority] = useState<Priority>(Priority.HIGH);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formFunc = () => {
    const newTodo: TodoI = {
      id: Date.now(),
      name: inputName,
      description: textareaDescription,
      status: inputStatus,
      priority: inputPriority,
    };

    const currentList = localStorage.getItem("todolist") || "";
    if (currentList) {
      const newList = JSON.parse(currentList);
      newList.push(newTodo);
      localStorage.setItem("todolist", JSON.stringify(newList));
    } else {
      const newList = [];
      newList.push(newTodo);
      localStorage.setItem("todolist", JSON.stringify(newList));
    }
    reset({ todoname: "", todoDescription: "" });
  };

  return (
    <form
      className="create-todo__form"
      action="#"
      onSubmit={handleSubmit(formFunc)}
    >
      <label className="create-todo__inputs" htmlFor="inputName">
        <div className="create-todo__input-block">
          <p className="create-todo__help-text">Введите название тудушки: </p>
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
          <p className="create-todo__help-text">Введите описание тудушки: </p>
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
              <label className="create-todo__label" htmlFor={item.value}>
                {item.label}
              </label>
              <input
                className="create-todo__checkbox"
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
              <label className="create-todo__label" htmlFor={item.value}>
                {item.label}
              </label>
              <input
                className="create-todo__checkbox"
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
      <button className="create-todo__btn" type="submit">
        Создать тудушку
      </button>
    </form>
  );
};
