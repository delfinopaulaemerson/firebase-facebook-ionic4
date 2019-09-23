import { AuthService } from './core/services/auth.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  pages: { url: string; direction: string; icon: string; text: string }[];
  user: firebase.User;
  constructor(
    private authservice: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.pages = [
      { url: '/task-list', direction: 'back', icon: 'checkmark', text: 'Tasks' },
      { url: '/task-save', direction: 'forward', icon: 'add', text: 'new Task' }
    ];
    this.authservice.authState$.subscribe(user => {
      this.user = user;
    });
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
