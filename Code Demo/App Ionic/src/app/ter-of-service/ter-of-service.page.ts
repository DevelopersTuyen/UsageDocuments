import { Component, OnInit } from '@angular/core';
import { DbService } from './../services/db.service';

@Component({
  selector: 'app-ter-of-service',
  templateUrl: './ter-of-service.page.html',
  styleUrls: ['./ter-of-service.page.scss'],
})
export class TerOfServicePage implements OnInit {

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
