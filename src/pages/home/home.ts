import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTrackerProvider } from "../../providers/location-tracker/location-tracker";
import {  AlertController, ToastController } from 'ionic-angular';
import { MapsPage } from '../maps/maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public nav: NavController,
    public locationTracker: LocationTrackerProvider,
    private alertCtrl: AlertController,
    public toastController: ToastController
  ) {  }

  public start() {
   this.locationTracker.isLocationEnabled().then(res=>{
    if (res) {
      this.presentToast('Your Position Tracking  is running .')
      this.locationTracker.startTracking();
    }
    else {
      this.presentToast('Your Position is not enabled !')
    }
   })

  }

  public stop() {
    this.locationTracker.stopTracking();
    this.presentToast('Your Position Tracking was stopped .')
  }

  public clearLocations() {
    this.locationTracker.clear()
    this.presentToast('Your Position Tracking was cleared ! ')
  }

  goToMap() {
    this.nav.push(MapsPage);
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
