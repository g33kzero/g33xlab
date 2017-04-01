import { Component, OnInit } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { TaskListService } from './task-list.service';
import * as moment from 'moment';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Output()
  startAjaxRequest = new EventEmitter<void>();

  @Output()
  completeAjaxRequest = new EventEmitter<void>();

  tasks: String[];

  constructor(private taskListService: TaskListService) {

  }

  ngOnInit() { this.loadTasks(); }

  private loadTasks() {
    this.startAjaxRequest.emit();
    this.taskListService.loadTasks$().subscribe(
      response => this.tasks = response.json(),
      error => console.log(error),
      () => this.completeAjaxRequest.emit()
    );
  }

  taskAddedHandler(task) {
    this.startAjaxRequest.emit();
    this.taskListService.addTask$(task).subscribe(
      response => this.loadTasks(),
      error => console.log()
    );
  }

  deleteTask(task) {
    this.startAjaxRequest.emit();
    this.taskListService.deleteTask$(task).subscribe(
      response => this.loadTasks(),
      error => console.log()
    );
  }
}
