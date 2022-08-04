import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public toastController: ToastController) { }

  async showAlert(message: string, duration: number) {
    const toast = await this.toastController.create({
      color: 'dark',
      duration: duration,
      message: message,
    });
    await toast.present();
  }
}
