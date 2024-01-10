
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';


import { IonicStorageModule } from '@ionic/storage-angular';

//---SQL
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { OneSignal } from '@ionic-native/onesignal/ngx';
// import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';

import {NgxPaginationModule} from 'ngx-pagination'
import { FormGroup, FormBuilder } from "@angular/forms";
import { Location,DatePipe  } from '@angular/common';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
// import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
// import { FCM } from '@awesome-cordova-plugins/fcm/ngx';
// import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
// import { Badge } from '@awesome-cordova-plugins/badge/ngx';
// import { Badge } from '@ionic-native/badge/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    IonicStorageModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    Clipboard,
    StatusBar,
    // Badge,
    Diagnostic,
    SplashScreen,
    BarcodeScanner,
    SQLite,
    // BackgroundMode ,
    // SQLitePorter,
    InAppBrowser,
    WebView,
    HTTP,
    OneSignal,
    OpenNativeSettings,
    { 
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    // FCM,
    // Firebase,
    FormBuilder,
    DatePipe,
    // FirebaseX
    // LocalNotifications
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }