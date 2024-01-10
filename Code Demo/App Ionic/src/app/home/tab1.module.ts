import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab1Page } from './tab1.page';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

import { Tab1PageRoutingModule } from './tab1-routing.module';


//---SQL
import { DbService } from './../services/db.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Tab1PageRoutingModule,
  ],
  declarations: [Tab1Page]
  ,
  providers: [
    StatusBar,
    BarcodeScanner,
    SQLite,
    DbService,
    WebView,
    InAppBrowser
  ]
})
export class Tab1PageModule {}
