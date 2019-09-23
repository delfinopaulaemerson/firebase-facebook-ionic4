import { OverlayService } from './../core/services/overlay.service';
import { Task } from './../../model/task.model';
import { NavController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TaskService } from '../core/services/task.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss']
})
export class TaskListPage implements OnInit {
  tasks$: Observable<any[]>;
  tasks: Task[];
  idDocument: string;
  constructor(
    private navControler: NavController,
    private taskservice: TaskService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.tasks$ = this.taskservice.getCollection$();
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

  onSave() {
    this.navControler.navigateForward('/task-save');
  }
}
