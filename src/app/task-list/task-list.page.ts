import { OverlayService } from './../core/services/overlay.service';
import { Task } from './../../model/task.model';
import { NavController, AlertController, ToastController } from '@ionic/angular';
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
  tasks: Task[];
  idDocument: string;
  toast: any;
  constructor(
    private navControler: NavController,
    private taskservice: TaskService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private overlay: OverlayService
  ) {}

  async ngOnInit() {
    const loading = await this.overlay.loading({
      message: 'List...'
    });
    this.tasks$ = this.taskservice.getCollection$();
    loading.dismiss();
  }
  onUpdate(task: Task) {
    this.idDocument = this.taskservice.getIdDocumentTaskLocalStorage(task.id);
    this.navControler.navigateForward('/edit/' + this.idDocument);
  }

  async onDelete(task: Task) {
    const alert = await this.alertCtrl.create({
      header: 'Delete',
      message: 'Documento será deletado.',
      buttons: [
        {
          text: 'No',
          cssClass: 'secondary',
          handler: () => {
            this.navCtrl.navigateBack('/task-list');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.idDocument = this.taskservice.getIdDocumentTaskLocalStorage(task.id);
            this.taskservice.delete(this.idDocument);
            this.navCtrl.navigateBack('/task-list');
          }
        }
      ]
    });
    alert.present();
  }
  onDone(task: Task) {
    this.toast = this.toastController
      .create({
        message: 'Tarefa foi Atualizada!',
        duration: 2000
      })
      .then(toastData => {
        console.log(toastData);
        toastData.present();
      });
    const taskToUpdate = { ...task, done: !task.done };
    this.idDocument = this.taskservice.getIdDocumentTaskLocalStorage(task.id);
    this.taskservice.update(this.idDocument, taskToUpdate);
    this.toast = this.toastController.dismiss();
  }

  onSave() {
    this.navControler.navigateForward('/task-save');
  }
}
