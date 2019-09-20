import { Task } from 'src/model/task.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task: Task;
  @Output() done = new EventEmitter<Task>();
  @Output() update = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();
}
