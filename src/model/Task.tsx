import { TaskStatus } from "./TaskStatus.ts";

export class Task {
  private _id;
  private _title: string;
  private _description: string;
  private _status: TaskStatus;

  constructor(id: number, title: string, description: string, status: TaskStatus) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._status = status;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get status() {
    return this._status;
  }

  set title(title: string) {
    this._title = title;
  }

  set status(status: TaskStatus) {
    this._status = status;
  }

  set description(description: string) {
    this._description = description;
  }
}
