import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss']
})
export class TaskListPage implements OnInit {
  tasks$: Observable<any[]>;
  constructor(private navControler: NavController, private taskservice: TaskService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskservice.getAll();
  }

  onSave() {
    this.navControler.navigateForward('/task-save');
  }
}
