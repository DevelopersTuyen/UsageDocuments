import { ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { DbService,Note  } from './../services/db.service';
import { NotifacationService  } from './../services/notifacation.service';
import { AlertController, ModalController } from '@ionic/angular';
// import { FCM } from '@ionic-native/fcm/ngx';
// import { FCM } from '@awesome-cordova-plugins/fcm/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  NotiJgrab: any = [];
  data123: any = [];
  notes: Note[] = [];
  pushes: any = [];
  constructor( public sanitizer: DomSanitizer,
    public db: DbService,
    // private fcm: FCM, 
    public plt: Platform,
    public database:NotifacationService,
    private cd: ChangeDetectorRef, 
    private alertCtrl: AlertController, 
    private modalCtrl: ModalController
    ) {

    this.db.GetNotiOne();
    this.db.createDB();
    this.db.getNotiLocal(); 
    this.db.reateDB();


    // this.plt.ready()
    // .then(() => {
      
    //   this.fcm.onNotification().subscribe(data => {
    //     if (data.wasTapped) {
    //       console.log("Received in background");
    //     } else {
    //       console.log("Received in foreground");
    //     };
    //   });

    //   this.fcm.onTokenRefresh().subscribe(token => {
    //     // Register your new token in your back-end if you want
    //     // backend.registerToken(token);
    //   });
    // })
    
  }

  // subscribeToTopic() {
  //   this.fcm.subscribeToTopic('enappd');
  // }
  // getToken() {
  //   this.fcm.getToken().then(token => {
  //     // Register your new token in your back-end if you want
  //     // backend.registerToken(token);
  //   });
  // }
  // unsubscribeFromTopic() {
  //   this.fcm.unsubscribeFromTopic('enappd');
  // }





  public getNoti(){
    this.db.getNotiJgrab().subscribe((response) => {
      this.NotiJgrab = response;
    });
  }

  public data ="";

  public newContent:any;
  public html=" <style>.popup{display:block;} <style>";
  public html2= "<style>.popup{display:none;} <style>";

  public checkdata(){
  }
  public checkRead(id){
    this.db.CheckaddNoti(id);
    var ids =setInterval(() => {
      this.loadPage();
    }, 1000); 
    setTimeout(() => { 
      clearInterval(ids); 
    }, 1500);
    // this.db.CheckaddNotiOne(id);
  }
  public DeleteNoti(id){
    this.db.deleteNoti(id);
  }
  public openBrowser1(url,ids){
    this.db.CheckaddNoti(ids);
    this.db.openWithCordovaBrowser(url);
  }
  public check(){
    // this.data123 = this.db.CheckPoin();
    // console.log("++++"+ JSON.stringify(this.data123))
  }
  getList(event) {
      event.target.complete();
      this.db.getNotiLocal(); 
      this.db.GetNotiOne();
  }
  ngOnInit() {
    setInterval(() => {
      this.loadPage();
    }, 60000);
  }
  loadPage(){
    this.db.getNotiLocal();
    this.db.GetNotiOne();
    this.db.GetNotiqrcodejgrab();
  }
  public goToBarcodeScan(){
    this.db.goToBarcodeScan();
  }
  public checkCamera(){
    this.db.checkPermissionsForCamera();
  }
  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  public youtubeSrc : any;
  setSrc(link,isOpen: boolean){
    
    console.log(link.substring(0,5));
    if(link.substring(0,5) === 'https'){
      this.isModalOpen = isOpen;
    }
    else{
      console.log('2222');
    }
    console.log(link);
    this.youtubeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }
}
