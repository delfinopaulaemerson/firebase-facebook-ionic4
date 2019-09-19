import { Observable } from 'rxjs';
import { User, AuthProvider, AuthOptions } from './auth.types';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState$: Observable<firebase.User>;
  constructor(private afauth: AngularFireAuth) {
    this.authState$ = this.afauth.authState;
  }

  get isAuthenticate(): Observable<boolean> {
    return this.authState$.pipe(map(user => user !== null));
  }

  public authenticate({ isSignIn, provider, user }: AuthOptions): Promise<auth.UserCredential> {
    let operation: Promise<auth.UserCredential>;
    if (provider !== AuthProvider.Email) {
      operation = this.signInWithPoupUp(provider);
    } else {
      operation = isSignIn ? this.signInWithEmail(user) : this.signInWithEmail(user);
    }
    return operation;
  }

  private signInWithEmail({ email, password }: User): Promise<auth.UserCredential> {
    return this.afauth.auth.signInWithEmailAndPassword(email, password);
  }

  public signUpWithEmailAndPassword({ email, password, name }: User): Promise<auth.UserCredential> {
    return this.afauth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credentials =>
        credentials.user
          .updateProfile({ displayName: name, photoURL: null })
          .then(() => credentials)
      );
  }

  private signInWithPoupUp(provider: AuthProvider): Promise<auth.UserCredential> {
    let signInProvider = null;

    switch (provider) {
      case AuthProvider.Facebook:
        signInProvider = new auth.FacebookAuthProvider();
        break;
    }
    return this.afauth.auth.signInWithPopup(signInProvider);
  }

  logout(): Promise<void> {
    return this.afauth.auth.signOut();
  }
}
