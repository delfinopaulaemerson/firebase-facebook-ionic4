import { OverlayService } from 'src/app/core/services/overlay.service';
import { AuthService } from './core/services/auth.service';
import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { async } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  pages: { url: string; direction: string; icon: string; text: string }[];
  user: firebase.User;
  menu: string;
  constructor(
    private authservice: AuthService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private menuCtrl: MenuController
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
    this.menuCtrl.enable(true, this.menu);
  }
  async logOut(): Promise<void> {
    await this.overlayService.alert({
      message: 'Deseja realmente sair do app?',
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this.authservice.logout();
            await this.menuCtrl.enable(false, this.menu);
            this.navCtrl.navigateRoot(['/login']);
          }
        },
        'Não'
      ]
    });
  }
}
