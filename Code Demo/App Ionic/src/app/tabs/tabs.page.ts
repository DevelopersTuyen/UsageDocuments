import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { Location,DatePipe  } from '@angular/common';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { InAppBrowser,InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import {DomSanitizer} from "@angular/platform-browser";
import { Platform } from '@ionic/angular';
// import { SQLite } from '@ionic-native/sqlite/ngx';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage {
  scannedData: any;
  encodedData: '';
  encodeData: any;
  mainForm: FormGroup;
  Data: any[] = [];
  myDate = new Date();
  // isOn = false;
  public options : InAppBrowserOptions = {
    closebuttoncolor: "#F34A4A",
    lefttoright: 'yes',
    hideurlbar: 'yes',
    toolbarcolor: '#E8E8E9',
    useWideViewPort: 'no',
    hidenavigationbuttons: 'yes',
    footer: 'no',
    message: "Hello",
    hidden : 'no', //Or  'yes'
    clearcache : 'no',
    clearsessioncache : 'no',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'X', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'no',//Windows only 
    EnableViewPortScale: 'yes',
  };
  public options2 : InAppBrowserOptions = {
    closebuttoncolor: "#F34A4A",
    lefttoright: 'yes',
    hideurlbar: 'yes',
    toolbarcolor: '#E8E8E9',
    useWideViewPort: 'no',
    hidenavigationbuttons: 'yes',
    footer: 'no',
    message: "Hello",
    hidden : 'no', //Or  'yes'
    clearcache : 'no',
    clearsessioncache : 'no',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'X', //iOS only
    toolbarposition:'top',
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'no',//Windows only 
    EnableViewPortScale: 'yes',
  };
  public url='https://www.j-grab.com/pages/about-j-grab';
  public target = "_self";
  public target2 = "_blank";
  constructor(public barcodeCtrl: BarcodeScanner
    ,public alertController: AlertController,
    private location: Location,
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router,
    private datePipe: DatePipe,
    private iab: InAppBrowser,
    private sanitizer: DomSanitizer,
    public platform: Platform,
    ) {
      // this.db.GetNotiOne2();
     }
    ngOnInit() {
      setInterval(() => {
        this.loadnumber();
      }, 2000);
    }
    loadnumber(){
      this.db.getNotiLocal2(); 
    }
    storeDataQR(barcodeData,imgURL,NameTitle) {

      this.db.addQR(
        barcodeData['text'],
        NameTitle,
        imgURL,
        this.datePipe.transform(this.myDate, 'dd-MM-yyyy  hh:mm:ss')
      )
    }
  // ------Scan QR------
  // public buttonText ="Loading…";
  // public loading = true;
  goToBarcodeScan() {
    var barcodeData12= 'https://www.facebook.com/';
    this.db.getSong();
    const options: BarcodeScannerOptions = {
      
      showTorchButton: true,
      torchOn: false,
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417',
      orientation: 'portrait', 
      preferFrontCamera: false,
      showFlipCameraButton: false,
      saveHistory : false,
      prompt: 'Place a QrCode inside the scan area',
      
      // disableSuccessBeep	boolean	Tắt tiếng bíp thành công. Chỉ hỗ trợ trên iOS.

    };
    
    this.barcodeCtrl.scan(options).then(barcodeData => {
        this.scannedData = barcodeData;
        // console.log("kết quả"+ barcodeData);
        
        if(barcodeData['text'] == null || barcodeData['text'] == "" ){
          // console.log('11111111111111111');
          return false;
        }
        else {
          if(this.platform.is('ios')){
            var browser = this.iab.create(barcodeData['text'],this.target2,this.options2);
          }
          else 
          {
            var browser = this.iab.create(barcodeData['text'],this.target,this.options);
          }
          browser.on('loadstop').subscribe((event) => {
            browser.executeScript({ 
              code:"\
              var resutlObj = document.getElementsByClassName('lazyloaded')[0].srcset;\
              var resutlObjTitle = document.getElementsByClassName('product-meta__title')[0].textContent;\
              var message = resutlObj;\
              var message1 = resutlObjTitle;\
              var messageObj = {message: message,message1: message1};\
              var stringifiedMessageObj = JSON.stringify(messageObj);\
              window.webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj)\
              "
            })
          });
          browser.on('message').subscribe((event)=>{
            const postObject:any = event;
            var imgURL=  postObject.data.message;
            var NameTitle=  postObject.data.message1;
            this.storeDataQR(barcodeData,imgURL,NameTitle);
          });
          
        }
        
    }).catch(err => {
      // this.presentAlertConfirm(barcodeData12);
      console.log('Error scan qr', err);
    });
  }
  
  goToCreateCode() {
    this.barcodeCtrl.encode(this.barcodeCtrl.Encode.TEXT_TYPE, this.encodeData).then((encodedData) => {
      console.log(encodedData);
      this.encodedData = encodedData;
    }, (err) => {
      console.log('Error occured : ' + err);
    });
  }

  
  //  Qrr code tessttttttttttttt
}
