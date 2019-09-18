import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afauth: AngularFireAuth) {}

  private signInWithEmailAndPassword({ email, password }): Promise<auth.UserCredential> {
    return this.afauth.auth.signInWithEmailAndPassword(email, password);
  }
}
