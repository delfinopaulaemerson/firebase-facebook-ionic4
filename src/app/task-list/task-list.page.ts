import { Task } from 'src/model/task.model';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss']
})
export class TaskListPage implements OnInit {
  tasks$: Observable<Task[]>;
  constructor() {}

  ngOnInit(): void {
    this.tasks$ = of([
      { id: 'mjhkjhd', title: 'Developer Web', done: false },
      { id: 'pmpmm', title: 'Developer Hibrido', done: false },
      { id: 'ascsccas', title: 'Developer Nativo', done: false }
    ]);
  }
}
