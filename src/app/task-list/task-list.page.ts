import { NavController } from '@ionic/angular';
import { OverlayService } from './../core/services/overlay.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss']
})
export class TaskListPage implements OnInit {
  tasks$: Observable<any[]>;
  constructor(private navControler: NavController) {}

  ngOnInit(): void {
    this.tasks$ = of([
      { id: 'mjhkjhd', title: 'Developer Web', done: false },
      { id: 'pmpmm', title: 'Developer Hibrido', done: false },
      { id: 'ascsccas', title: 'Developer Nativo', done: false }
    ]);
  }

  onSave() {
    this.navControler.navigateForward('/task-save');
  }
}
