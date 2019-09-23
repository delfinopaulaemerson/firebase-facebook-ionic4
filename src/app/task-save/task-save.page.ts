import { Observable } from 'rxjs/internal/Observable';
import { Task } from 'src/model/task.model';
import { ActivatedRoute } from '@angular/router';
import { OverlayService } from './../core/services/overlay.service';
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
  pageTitle: string;
  idDocument: string = undefined;
  task: Task;
  objTask: Observable<Task>;
  constructor(
    private fb: FormBuilder,
    private taskservice: TaskService,
    private navCtrl: NavController,
    private overlay: OverlayService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.init();
  }
  init(): void {
    const documentId = this.route.snapshot.paramMap.get('id');
    if (!documentId) {
      this.pageTitle = 'Create Task';
      return;
    }
    this.pageTitle = 'Edit Task';
    this.idDocument = documentId;
    this.objTask = this.taskservice.getIdTask(this.idDocument);
    this.objTask.subscribe(task => {
      this.task = task;
      this.taskform.get('title').setValue(this.task.title);
      this.taskform.get('done').setValue(this.task.done);
      console.log(task);
    });
  }

  createObjectTaskGroup(task: Task): FormGroup {
    return this.fb.group({
      id: [task.id],
      title: [task.title],
      done: [task.done]
    });
  }

  createForm() {
    this.taskform = this.fb.group({
      title: ['', Validators.required],
      done: [false]
    });
  }
  async onSubmit(): Promise<void> {
    const loading = await this.overlay.loading({
      message: 'Saving...'
    });
    try {
      if (!this.idDocument) {
        const task = await this.taskservice.addTask(this.taskform.value);
        this.navCtrl.navigateBack('/task-list');
      } else {
        const taskUpdate = this.taskservice.update(this.idDocument, this.taskform.value);
        this.navCtrl.navigateBack('/task-list');
      }
    } catch (error) {
      console.log('Erro ao salvar tarefa', error);
      await this.overlay.toast({
        message: error.message
      });
    } finally {
      loading.dismiss();
    }
  }
}
