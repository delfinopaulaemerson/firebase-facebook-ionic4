import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { Task } from 'src/model/task.model';
import { Firestore } from '../firestore.class';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends Firestore<Task> {
  constructor(db: AngularFirestore, private authService: AuthService) {
    super(db);
  }

  //cada usuario tem sua propria lista
  private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection('/users/' + user.uid + '/tasks');
        return null;
      }
      this.setCollection(null);
    });
  }
}
