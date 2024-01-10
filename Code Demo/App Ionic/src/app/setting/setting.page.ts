import { Component, OnInit } from '@angular/core';
import { InAppBrowser,InAppBrowserOptions  } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { DbService } from './../services/db.service';
import { DomSanitizer} from '@angular/platform-browser';
import { Observable,Subscription, interval  } from 'rxjs';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public url='https://www.j-grab.com/pages/about-j-grab';
  public target = "_self";

  public html=" <style>.login2{display:none;} <style>";
  public html2= "<style>.login1{display:none;} <style>";
  public newContent:any;


  public options : InAppBrowserOptions = {
    closebuttoncolor: "#ffffff",
    lefttoright: 'yes',
    hideurlbar: 'yes',
    toolbarcolor: '#145a7b',
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
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
  };
  constructor( 
    private theInAppBrowser:InAppBrowser,
    private db:DbService,
    private sanitizer:DomSanitizer
    ) {
    this.db.getSong();
    this.checklogin1();
    this.db.name_model;
  }

  ngOnInit() {
    interval(3000).subscribe(
      (val) => { this.checklogin1()});
  }

  public openBrowser(url){
   
    this.db.openWithCordovaBrowser(url);
  }

  public checklogin1(){
    var a =this.db.name_model.toString();

    if(a == "1"){
      this.newContent=this.sanitizer.bypassSecurityTrustHtml(this.html);
    }
    else{
      this.newContent=this.sanitizer.bypassSecurityTrustHtml(this.html2);
    }
  }
  public goToBarcodeScan(){
    this.db.goToBarcodeScan();
  }
  public checkCamera(){
    this.db.checkPermissionsForCamera();
  }
}
