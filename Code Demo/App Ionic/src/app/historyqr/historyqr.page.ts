import { Component, OnInit } from '@angular/core';
import { Observable,Subscription, interval  } from 'rxjs';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { DomSanitizer} from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';
// import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-historyqr',
  templateUrl: './historyqr.page.html',
  styleUrls: ['./historyqr.page.scss'],
})
export class HistoryqrPage implements OnInit {
  QrCodeJgrab: any = [];
  QrCodeJgrabUser: any = [];
  mainForm: FormGroup;

  public newContent:any;
  public html=" <style>.popup{display:block;} <style>";
  public html2= "<style>.popup{display:none;} <style>";
  constructor(
      private location:Location,
      public db: DbService,
      public sanitizer : DomSanitizer,
      public alertController :AlertController
    ) 
    {
      this.db.getQR();
      this.ionViewDidEnter();
      this.ionViewDidEnterUser();
    }
  Back(){
    this.location.back();
  }
  public openBrowser(url){
    // console.log(url);
    this.db.openWithCordovaBrowser(url);
  }
  ngOnInit() {
     interval(3000).subscribe(
      (val) => { this.db.getSong()});
  }
  public loadPage(){
    //this.db.getQRId();
    this.db.getQR();
    this.ionViewDidEnter();
    this.ionViewDidEnterUser();
    
  }
  //test 
  
  ionViewDidEnter() {
    this.db.getQrCodeJgrab().subscribe((response) => {
      this.QrCodeJgrab = response;
    })
  }
  public checkCamera(){
    this.db.checkPermissionsForCamera();
  }
  ionViewDidEnterUser() {
    this.db.getQrCodeJgrabUser().subscribe((response) => {
      this.QrCodeJgrabUser = response;
    })
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
      // subHeader: 'Beware lets confirm',
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
            // this.db.getQR();
            // this.ionViewDidEnter();
            this.ionViewDidEnterUser();
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  public goToBarcodeScan(){
    this.db.goToBarcodeScan();
  }
  clickQr(id){
    this.db.clickQrcode(id);
  }
}
