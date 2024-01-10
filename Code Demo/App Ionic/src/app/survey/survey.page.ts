import { Component, OnInit } from '@angular/core';
import { DbService } from './../services/db.service';
import { DomSanitizer } from '@angular/platform-browser';

import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Location } from '@angular/common';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {

  formJgrab = [];
  public youtubeSrc : any;
  constructor(
    public db: DbService,
    public location:Location,
    public sanitizer: DomSanitizer
  ) { 
    this.GetForm();

     this.db.getFormJgrab().subscribe((response) => {
        this.formJgrab = response;
        for ( var url of  this.formJgrab ){
          
          if(url.active == 1){
            console.log(url.link);
            this.youtubeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url.link);
          }
          // this.youtubeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('https://docs.google.com/forms/d/e/1FAIpQLSdOmPAh66_Pcsbq44Dn5cYEeWjynFHIxLibayDC18KyS7aKFA/viewform?embedded=true');
        }
      })
   
  }

  ngOnInit() {
  }
  GetForm() {
    this.db.getFormJgrab().subscribe((response) => {
      this.formJgrab = response;
    })
  }
  public checkCamera(){
    this.db.checkPermissionsForCamera();
  }
  setSrc(link){
    console.log(link);
    this.youtubeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

  show: {[key: number]: boolean} = {};
  public ngIfCtrl(index: number){
    if(this.show[index] == true) {
      this.show[index] = false;
    }else{
      this.show[index] = true
    }
  }
  
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  public openBrowser(url){
   
    this.db.openWithCordovaBrowser(url);
  }
}
