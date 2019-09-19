import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AlertOptions, LoadingOptions, ToastOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  constructor(
    private alertCtr: AlertController,
    private loadCtr: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async alert(options?: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtr.create(options);
    await alert.present();
    return alert;
  }

  async loading(options?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadCtr.create({
      message: ' Loading...',
      ...options
    });
    await loading.present();
    return loading;
  }
  async toast(options?: ToastOptions): Promise<HTMLIonToastElement> {
    const toast =  await this.toastCtrl.create({
      position: 'bottom',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'OK',
      ...options
    });
    await toast.present();
    return toast;
}
