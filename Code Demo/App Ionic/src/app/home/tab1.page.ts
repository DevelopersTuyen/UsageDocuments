import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import {TabsPage} from '../tabs/tabs.page';
import { InAppBrowser,InAppBrowserOptions  } from '@awesome-cordova-plugins/in-app-browser/ngx';
//----SQL
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Subscription, interval  } from 'rxjs';
import { Location } from '@angular/common';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit  {
  Banner: any = [];
  QrCodeJgrab: any = [];
  QrCodeJgrabUser: any = [];
  QrCodeJgrabUser1: any = [];
  mainForm: FormGroup;

  public newContent:any;
  public html=" <style>.popup{display:block;} <style>";
  public html2= "<style>.popup{display:none;} <style>";
  Datas: any[] = [];

  constructor (
    public db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router,
    private webview: WebView,
    private theInAppBrowser: InAppBrowser,
    private http: HttpClient,
    private location:Location,
    public sanitizer : DomSanitizer,
    public alertController :AlertController,
    private navCtrl: NavController
    )
    { 
      // this.db.getQR();
      this.ionViewDidEnter();
      this.ionViewDidEnterUser();
    }
  ngOnInit() {
    var id =setInterval(() => {
      this.loadPage();
    }, 2000); 
    setTimeout(() => { 
      clearInterval(id); 
    }, 2500);
    this.getBanner();
  }
  public openBrowser(url){
   
    this.db.openWithCordovaBrowser(url);
    this.db.countNumber();
  }
  public goToBarcodeScan(){
    this.db.goToBarcodeScan();
  }
  public checkCamera(){
    this.db.checkPermissionsForCamera();
  }
  public loadPage(){
    this.db.getQR();
    // this.db.getSong();
    this.ionViewDidEnter();
    this.ionViewDidEnterUser();
  }
  //test 
  
  ionViewDidEnter() {
    this.db.getQrCodeJgrab().subscribe((response) => {
      this.QrCodeJgrab = response;
    })
  }
  ionViewDidEnterUser() {
    this.db.getQrCodeJgrabUser().subscribe((response) => {
      this.QrCodeJgrabUser = response;
    })
  }
  ionViewDidEnterUser1() {
  }
  
  getList(event) {
      event.target.complete();
      this.db.getQR();
      this.ionViewDidEnter();
      this.ionViewDidEnterUser();
  }
  openMerges(){
    this.db.addMergeCode();
  }
  async  presentConfirm() {
    this.alertController.create({
      header: 'Confirm Alert',
      cssClass : 'custom',
      message: 'Are you sure? you want merge data?',
      buttons: [
        {
          text: 'Not Sure',
          handler: () => {
            console.log('Let me think');
          }
        },
        {
          text: 'Yes!',
          handler: () => {
            this.db.addMergeCode();
            this.ionViewDidEnterUser();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  abv() {
    this.alertController.create({
      header: 'Do you want to add the scanned items to your Scan History?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Let me think0');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Let me think4');
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  tab(){
    this.navCtrl.navigateForward('/tabs/tab2');
  }
  tabSurrey(){
    this.navCtrl.navigateForward('/tabs/setting/survey');
  }
  getBanner(){
   
    this.db.getBanner().subscribe((response) => {
      console.log(response);
      this.Banner = response;
    })
  }
  clickQr(id,url){
    this.db.clickQrcode(id);
    this.openBrowser(url);
  }
}
