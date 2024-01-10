import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DbService } from './../services/db.service';
import { DomSanitizer} from '@angular/platform-browser';
import { Observable,Subscription, interval  } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {
  //<ion-label (click)="openBrowser('https://www.j-grab.com/account/login')">Login</ion-label>

  public html=" <style>.login2{display:none;} <style>";
  //public html2="<ion-label (click)='openBrowser( 'https://www.j-grab.com/account')'>Information Account</ion-label>";
  public html2= "<style>.login1{display:none;} <style>";
  public newContent:any;
  constructor(private location:Location,private db:DbService,private sanitizer:DomSanitizer,private navCtrl: NavController) {
    this.checklogin1();
    this.db.name_model;
  }

  ngOnInit() {
    
    // this.checklogin1();
    // this.db.name_model;
    interval(3000).subscribe(
      (val) => { this.checklogin1()});
  }
  Back(){
    this.location.back();
  }
  public openBrowser(url){
    this.db.openWithCordovaBrowser(url);
  }
  public checklogin1(){
    var a =this.db.name_model.toString();
    // console.log("đây là "+ typeof(this.db.name_model));
    // var a = "2";
    if(a == "1"){
      this.newContent=this.sanitizer.bypassSecurityTrustHtml(this.html);
    }
    else{
      this.newContent=this.sanitizer.bypassSecurityTrustHtml(this.html2);
      // this.navCtrl.back();
    }
     
  }
}
