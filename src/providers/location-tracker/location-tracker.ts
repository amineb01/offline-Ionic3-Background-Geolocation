import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Http, Headers, Response, } from '@angular/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Observable } from 'rxjs';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';


import { Crashlytics } from '@ionic-native/fabric';

@Injectable()
export class LocationTrackerProvider {
  trakings: Array<Object>;

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  trackingValues=[];
  db

  constructor(
    private crashlytics: Crashlytics,
    private backgroundMode: BackgroundMode,
    private sqlite: SQLite,
    public zone: NgZone,
    public backgroundGeolocation: BackgroundGeolocation,
    public geolocation: Geolocation )
  {  }

  startTracking() {
    this.backgroundMode.on('activate').subscribe(() => { this.backgroundMode.disableWebViewOptimizations(); });
      // Background Tracking

    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      interval: 5000,
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates

    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });

    }, (err) => {

      console.log(err);

    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();

    // Foreground Tracking

    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
    this.crashlytics.addLog('position');
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    });
 }


  stopTracking() {
    this.backgroundGeolocation.stop();
    if (this.watch) this.watch.unsubscribe();
  }

  clear() {
    this.backgroundGeolocation.deleteAllLocations()
  }

  isLocationEnabled() {
    return  this.backgroundGeolocation.isLocationEnabled()
  }

  public findAll() {
    return  this.backgroundGeolocation.getValidLocations()
  }

}
