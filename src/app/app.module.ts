import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

import { MyApp } from './app.component';


import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import {BackgroundGeolocation} from "@ionic-native/background-geolocation";
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
import { Storage } from '@ionic/storage';
import { AccountsProvider } from '../providers/accounts';
import { IonicStorageModule } from '@ionic/storage';


import { MapsPageModule } from '../pages/maps/maps.module';

import { HomePageModule } from '../pages/home/home.module';


import { HomePage } from '../pages/home/home';
import { MapsPage } from '../pages/maps/maps';
import { SQLite } from '@ionic-native/sqlite';
import { GoogleMaps } from '@ionic-native/google-maps';

import { Crashlytics } from '@ionic-native/fabric';




@NgModule({
  declarations: [
    MyApp
     ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    MapsPageModule,
    HomePageModule


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapsPage,
  ],
  providers: [
    Crashlytics,
    BackgroundMode,
    GoogleMaps,
    AccountsProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationTrackerProvider,
    BackgroundGeolocation,
    Geolocation,
    SQLite
  ]
})

export class AppModule {}
