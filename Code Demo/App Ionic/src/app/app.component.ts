import { Component , NgZone} from '@angular/core';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { DbService  } from './services/db.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpResponse, } from '@angular/common/http';
import { OneSignal ,OSNotificationPayload} from '@ionic-native/onesignal/ngx';
// import { OneSignal ,OSNotificationPayload} from '@awesome-cordova-plugins/onesignal/ngx';
import { mergeScan } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

// import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
// import { FCM } from '@awesome-cordova-plugins/fcm/ngx';

// import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { BackgroundMode } from '@ionic-native/background-mode';
// import { Badge } from '@awesome-cordova-plugins/badge/ngx';
// import { Badge } from '@ionic-native/badge/ngx';







@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers:[ SQLite, DbService],
})
export class AppComponent {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private splashScreen: SplashScreen,
    private platform: Platform,
    private statusBar: StatusBar,
    private ngZone:NgZone,
    private router: Router,
    private httpClient: HttpClient,
    private db:DbService,
    private oneSignal: OneSignal,
    private alert: AlertController,
    // private fcm: FCM,
    public plt: Platform,
    // private badge: Badge,
    public alertController :AlertController,
    // private backgroundMode: BackgroundMode
    ) {
      this.platform.ready().then(() => {
        console.log('abc');
        // this.OneSignalInit();
        this.initializeApp();
        
      });
      // this.initializeApp2();
      
      
  }
  public oneSignalAppId = '32fccb23-feb5-4663-87ab-c2ada6618795';
  OneSignalInit() {
    
    if (!this.oneSignalAppId) { return; }
    
    // Uncomment to set OneSignal device logging to VERBOSE  
    // OneSignal.setLogLevel(6, 0);

    // NOTE: Update the setAppId value below with your OneSignal AppId.
    (window as any).plugins.OneSignal.setAppId(this.oneSignalAppId);
    (window as any).plugins.OneSignal.setNotificationOpenedHandler(function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
    (window as any).plugins.OneSignal.saveNotiLocal()
    // iOS - Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
    (window as any).plugins.OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
        console.log("User accepted notifications: " + accepted);
    });
    // var notificationReceivedEvent = function(jsonData) {
    //   var notificationData = JSON.stringify(jsonData)
    //   console.log('notificationOpenedCallback: ' + notificationData);
    // };
    (window as any).plugins.OneSignal.setNotificationWillShowInForegroundHandler(function(notificationReceivedEvent) {
      notificationReceivedEvent.complete(notificationReceivedEvent.getNotification());
      console.log('notificationOpenedCallback2: ' + JSON.stringify(notificationReceivedEvent));
      console.log('notificationOpenedCallback2: 22222222');
    });
  }

  public initializeApp(){
    // this.backgroundMode.enable();
    this.statusBar.styleDefault();
    setTimeout(() => {
      this.splashScreen.hide();
    }, 1000);
      this.oneSignal.startInit('32fccb23-feb5-4663-87ab-c2ada6618795', '117508238128');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      console.log('111111');
    
      this.oneSignal.getIds().then((ids) => 
      {
         console.log('getIds: ' + JSON.stringify(ids));
      });
      // this.badge.get
      this.oneSignal.handleNotificationReceived().subscribe((data) => {
          console.log("TEST1"+JSON.stringify(data));
          // this.badge.increase(1);
          console.log('11123111');
          this.onPushReceived(data.payload);
          this.db.GetNotiqrcodejgrab();
          //  this.db.saveNotiLocal(data1,data2);
          this.ngZone.run(() => {
            setTimeout(() => { 
              this.router.navigate(['/tabs/tab3/']);
            },100);
          });
              this.router.navigate(['/tabs/tab3/']);
      // });
      });

      
      console.log('xyz');
      this.oneSignal.iOSSettings
      // });
      this.oneSignal.handleNotificationOpened().subscribe((data) => {
        console.log("TEST2"+JSON.stringify(data));
        this.db.GetNotiqrcodejgrab();
        this.ngZone.run(() => {
          setTimeout(() => { 
            this.router.navigate(['/tabs/tab3/']);
          },100);
          });
          this.router.navigate(['/tabs/tab3/']);
        });
        this.oneSignal.endInit();
  }

  private onPushReceived(payload: OSNotificationPayload) {  
    console.log('ax123213');
    var data1 =payload.body;
    var data2 =payload.title;
    // this.db.saveNotiLocal(data1,data2);
  }  
    
  private onPushOpened(payload: OSNotificationPayload) {  
    console.log('bx123213');
    var data1 =payload.body;
    var data2 =payload.title;
    // this.db.saveNotiLocal(data1,data2);
  }  

  
}
