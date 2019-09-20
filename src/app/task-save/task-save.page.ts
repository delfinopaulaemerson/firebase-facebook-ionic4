import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../core/services/task.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss']
})
export class TaskSavePage implements OnInit {
  taskform: FormGroup;
  constructor(
    private fb: FormBuilder,
    private taskservice: TaskService,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.taskform = this.fb.group({
      title: ['', Validators.required],
      done: [false]
    });
  }
  async onSubmit(): Promise<void> {
    try {
      const task = await this.taskservice.addTask(this.taskform.value);
      this.navCtrl.navigateBack('/task-list');
    } catch (error) {
      console.log('Erro ao salvar tarefa', error);
    }
  }
}
