import { map, take } from 'rxjs/operators';
import { Task } from 'src/model/task.model';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference
} from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Observable<Task[]>;
  private taskCollection: AngularFirestoreCollection<Task>;
  private task: Task;

  constructor(private afs: AngularFirestore, private authservice: AuthService) {
    this.taskCollection = this.afs.collection<Task>('tasks');
  }

  addTask(task: Task): Promise<DocumentReference> {
    task.id = this.afs.createId();
    return this.taskCollection.add(task);
  }

  getCollection$(): Observable<Task[]> {
    return this.taskCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          console.log('const data=>  ' + data);
          const id = a.payload.doc.id;
          console.log('const id=> ' + id);
          localStorage.setItem(data.id, id);
          return { id, ...data };
        });
      })
    );
  }

  getCollection(): Observable<Task[]> {
    return this.afs.collection<Task>('tasks').valueChanges();
  }

  getIdTask(id: string): Observable<Task> {
    return this.taskCollection.doc<Task>(id).valueChanges();
  }

  getIdTaskDif(id: string) {
    this.authservice.authState$.subscribe(user => {
      const documento = user.uid;
      this.afs
        .collection('users')
        .doc<Task>(documento)
        .valueChanges()
        .pipe(
          take(1),
          map(task => {
            task.id = id;
            return task;
          })
        );
    });
  }
  delete(idDocument: string): Promise<void> {
    return this.afs.doc<Task>('tasks/' + idDocument).delete();
  }

  update(idDocument: string, task: Task): Promise<void> {
    return this.afs.doc<Task>('tasks/' + idDocument).update(task);
  }
  getIdDocumentTaskLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }
}
