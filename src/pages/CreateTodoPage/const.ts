import { Priority, Status } from "../../types";

export const statusArray = [
  {
    label: "Не начата",
    value: Status.NOT_STARTED,
  },
  {
    label: "В работе",
    value: Status.WORKING,
  },
  {
    label: "В анализе",
    value: Status.ANALYZING,
  },
];

export const priorityArray = [
  {
    label: "Высокий",
    value: Priority.HIGH,
  },
  {
    label: "Средний",
    value: Priority.MEDIUM,
  },
  {
    label: "Низкий",
    value: Priority.LOW,
  },
];
