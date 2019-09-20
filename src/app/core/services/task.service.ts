import { Injectable } from '@angular/core';
import { Task } from 'src/model/task.model';
import { Firestore } from '../firestore.class';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends Firestore<Task> {
  constructor(db: AngularFirestore) {
    super(db);
    
  }
}
