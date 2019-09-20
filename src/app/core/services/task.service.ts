import { Task } from 'src/model/task.model';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference
} from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Observable<Task[]>;
  private taskCollection: AngularFirestoreCollection<Task>;

  constructor(private afs: AngularFirestore, private authservice: AuthService) {
    this.taskCollection = this.afs.collection<Task>('tasks');
  }

  addTask(task: Task): Promise<DocumentReference> {
    task.id = this.afs.createId();
    return this.taskCollection.add(task);
  }

  getAll(): Observable<Task[]> {
    return this.taskCollection.valueChanges();
  }
}
