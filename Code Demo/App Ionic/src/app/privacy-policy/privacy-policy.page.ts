import { Component, OnInit } from '@angular/core';
import { DbService } from './../services/db.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage implements OnInit {

  constructor(public db: DbService) { }

  ngOnInit() {
  }
  public goToBarcodeScan(){
    this.db.goToBarcodeScan();
  }
  public openBrowser(url){
    this.db.openWithCordovaBrowser(url);
  }
  public checkCamera(){
    this.db.checkPermissionsForCamera();
  }
}
