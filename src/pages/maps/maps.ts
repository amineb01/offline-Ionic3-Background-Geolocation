import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker
} from "@ionic-native/google-maps";
import { ViewChild } from "@angular/core";
import 'rxjs/add/operator/map';
import { LocationTrackerProvider } from "../../providers/location-tracker/location-tracker";

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  @ViewChild('map') element;

  constructor( public locationTracker: LocationTrackerProvider, public googleMaps: GoogleMaps , public toastController: ToastController,

      public navCtrl: NavController, public navParams: NavParams) {

  }


   ngAfterViewInit() {
     let filtredlocations=[];
     this.locationTracker.findAll().then(locations=>
      {
        filtredlocations = locations.filter(location => location.provider === "gps");
        return  this.initMap (filtredlocations);
      })
   }



  initMap (locations) {
    this.presentToast('Your have '+locations.length+ ' points ! ')

    if (locations.length>0){
      let map: GoogleMap = GoogleMaps.create(this.element.nativeElement);

      map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

        let cameraCoordinates: LatLng = new LatLng(locations[0].latitude,
                                                   locations[0].longitude);
        let cameraPosition = {
          target: cameraCoordinates,
          zoom: 18
        };

        map.animateCamera(cameraPosition);

        locations.forEach((location) => {
          console.log (location.time)

          let coordinates: LatLng = new LatLng(location.latitude,
                                             location.longitude);

          let markerOptions: MarkerOptions = {
            position: coordinates,
            title: this.convertirTimestamp(location.time),

          };

          const marker = map.addMarker(markerOptions)
            .then((marker: Marker) => {
              marker.showInfoWindow();
            });

        });
      })
    }

  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  private convertirTimestamp(timestampnew)
    {
      let date = new Date(timestampnew );
      let jour = date.getDate();
      let  mois = date.getMonth()+1;
      let annee = date.getFullYear();
      let chaine = "Le " + jour + "/" + mois + "/" + annee + " à " + date.toLocaleTimeString();
      return chaine;
    }
}
