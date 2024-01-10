import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Song } from './song';
import { Qrcode } from './qrcode';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
// import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { InAppBrowser,InAppBrowserOptions,InAppBrowserEvent  } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { HttpHeaders, HttpResponse, } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { AlertController } from '@ionic/angular';
// import { CookieService } from 'ngx-cookie-service';
// import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';

import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';

import { FormGroup, FormBuilder } from "@angular/forms";
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { DatePipe  } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';

import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';


export interface Note {
  id?: string;
  title: string;
  text: string;
}
export class QRJgrab {
  product_name: string;
  product_image: string;
  url: string;
  date_time: string;
  user: string;
}
export class CounponJgrab {
  coupon_expiry: string;
  coupon_title: string;
  coupon_details: string;
  coupon_banner: string;
  coupon_code: string;
}
export class NotiJgrab {
  news_title: string;
  news_content: string;
  datetime: string;
}
export class Banner {
  url_of_image: string;
  redirect_URL:string;
  status: string;
}
export class FormJgrab {
  title:string;
  link:string;
  active:string;
}
@Injectable({
  providedIn: 'root'
})
export class DbService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  public Datasong: any[] = [];
  public Dataqr: any[] = [];
  public Datanotilocal: any[] = [];
  public Datanotilocal2: any[] = [];
  public DatanotilocalOne: any[] = [];
  public DatanotilocalOne2: any[] = [];
  public Datanoti: any[] = [];
  public Datasong1: any[] = [];
  public name_model: any[] = [] ;
  public coockibrow: number[] = [] ;
  private requestHeaders: HttpHeaders;
  // public myDate: Date;
  public myDate = new Date();
  public pipe = new DatePipe('J-US');
  
  private storage: SQLiteObject;
  
  public row_data: any = []; 
  
  public songsList = new BehaviorSubject([]);
  public QRList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly table_name: string = "songtable";
  readonly table_name2: string = "qrtable";
  readonly table_name3: string = "notifaction";
  readonly table_name4: string = "notification";
  readonly database_name: string = "showroom.db";
  readonly database_name1: string = "OneSignal1.db";

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
    // toolbarposition:'top',
    // disallowoverscroll : 'no', //iOS only 
    // toolbar : 'yes', //iOS only 
    // enableViewportScale : 'no', //iOS only 
    // allowInlineMediaPlayback : 'no',//iOS only 
    // presentationstyle : 'pagesheet',//iOS only 
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
  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private alertController:AlertController,
    // private sqlPorter: SQLitePorter,
    private http: HttpClient,
    private http2: HTTP,
    private readonly sanitizer: DomSanitizer,
    private readonly theInAppBrowser: InAppBrowser,
    // private firebasex: FirebaseX,
    private firestore: Firestore,
    public barcodeCtrl: BarcodeScanner,
    // private db: DbService,
    public formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private iab: InAppBrowser,
    private diagnostic: Diagnostic,
    private openNativeSettings: OpenNativeSettings,
    public location:Location,
    public navCtrl:NavController
    
    // private cookieService: CookieService 
  ) {
    this.requestHeaders = new HttpHeaders();
    this.requestHeaders.append('Content-Type', 'application/json');
    this.requestHeaders.append('Accept', 'application/json');

    this.platform.ready().then(() => {
      this.createDB();
      this.reateDB();
    });
    
  }
  headRequest(url: string):Observable<any> {
    return this.http.head(url, {observe: 'response'}); //is observe property necessary to make this http call? If not you can remove it.
  }
  // Create DB if not there
  createDB() {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    }).then((db: SQLiteObject) => {
        this.storage = db;
        this.createTable();
        this.createTable2();
        this.createTable3();
        this.addSong();
        this.getSong();
       
        // console.log('Database Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
   // Create table
  createTable() {
    this.storage.executeSql(`
    CREATE TABLE IF NOT EXISTS ${this.table_name}  (id INTEGER PRIMARY KEY, artist_name varchar(255), merge varchar(255))
    `, [])
      .then(() => {
        // console.log('Table Song!');
        
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
  createTable2() {
    this.storage.executeSql(`
    CREATE TABLE IF NOT EXISTS ${this.table_name2}  (id INTEGER PRIMARY KEY, text varchar(255),format varchar(255),cancelled varchar(255),datetime varchar(255),user varchar(255))
    `, [])
      .then(() => {
        // console.log('Table QR!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
  createTable3() {
    this.storage.executeSql(`
    CREATE TABLE IF NOT EXISTS ${this.table_name3}  (id varchar(255) PRIMARY KEY,texts varchar(255),body varchar(255),read varchar(255),dele varchar(255),date varchar(255))
    `, [])
      .then(() => {
        this.GetNotiqrcodejgrab();
        this.callNotiAgian();
      })
      .catch(e => {
        // console.log("error " + JSON.stringify(e));
      });
  }
  // dbState() {
  //   return this.isDbReady.asObservable();
  // }

  


  ///// Notifaction


  // get noti onesigal
  private database: SQLiteObject;
  reateDB() {
    // console.log('DB Create1');
    this.sqlite.create({
      name: this.database_name1,
      location: 'default'
    })
      .then((db1: SQLiteObject) => {
        this.database = db1;
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }
  GetNotiOne(){
    this.DatanotilocalOne=[];
     this.database.executeSql(`
      SELECT * FROM ${this.table_name4}
      `, [])
      .then((res) => {
        // this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            var notilist1= { 
              id: res.rows.item(i)._id, 
              title: res.rows.item(i).title, 
              message: res.rows.item(i).message, 
              opened: res.rows.item(i).opened,
              dismissed:res.rows.item(i).dismissed,
              created_time:res.rows.item(i).created_time,
            };
              this.DatanotilocalOne.push(notilist1);
              // console.log("Get Notilocal One");
          }
        }
      })
      .catch(e => {
        //alert("error view qr" + JSON.stringify(e))
      });
  
  }
  GetNotiOne2(){
    this.DatanotilocalOne2=[];
     this.database.executeSql(`
      SELECT * FROM notification WHERE opened = 0 
      `, [])
      .then((res) => {
        // this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            var notilist1= { 
              id: res.rows.item(i)._id, 
              title: res.rows.item(i).title, 
              message: res.rows.item(i).message, 
              opened: res.rows.item(i).opened,
              dismissed:res.rows.item(i).dismissed,
              created_time:res.rows.item(i).created_time,
            };
              this.DatanotilocalOne2.push(notilist1);
          }
        }
      })
      .catch(e => {
      });
  
  }
  CheckaddNotiOne(id){
    let data = [id];
    return this.database.executeSql(`UPDATE notification SET opened = 1 WHERE _id = ?`, data)
    .then(data => {
      // console.log('update notifaction !');
    })
  }

  public NotiSql: any = [];
  saveNoti(data){
    // this.storage.executeSql('INSERT INTO notifaction (texts,body,read) VALUES (?,?,?) ', data)
    // .then(res => {
    //   console.log('add noti 1231231312!');
    // });
    return this.httpClient.post('http://133.18.200.97:448/api/create-noti',JSON.stringify(data), this.httpOptions)
    .subscribe(data => {
      // console.log(data['_body']);
      }, error => {
      // console.log(error);
    });

    // INSERT INTO notifaction (id,texts,body,read,date) 
    //  SELECT id 
    //    FROM (
    //          SELECT 'test@domain.com' AS email
    //         ) AS table2
    //   WHERE NOT EXISTS (
    //                     SELECT *
    //                       FROM notifaction
    //                      WHERE email == table2.email
    //                    );
  }

  saveNotiLocal(ids,headings,contents,completed_at){
    // this.datePipe.transform(this.myDate, 'dd-MM-yyyy')
    console.log('tuyen2');
    var data= [JSON.stringify(ids),JSON.stringify(headings),JSON.stringify(contents),0,0,JSON.stringify(completed_at)] ;
    // this.storage.executeSql('INSERT INTO notifaction (id,texts,body,read,date) VALUES (?,?,?,?,?) ' ON CONFLICT(id) DO UPDATE SET texts=${headings},body=${contents} WHERE id=${ids}`, data) 
    this.storage.executeSql('INSERT INTO notifaction (id,texts,body,read,dele,date)VALUES(?,?,?,?,?,?)', data)
    .then(res => {
      console.log('add noti 1231231312!');
    })
    .catch(e => {
      // continue;
      console.log("error add noti" + JSON.stringify(e))
    });
  }
  getNotiLocal(){
    this.Datanotilocal=[];
     this.storage.executeSql(`
      SELECT * FROM ${this.table_name3} WHERE dele = 0.0 ORDER BY date DESC
      `, [])
      .then((res) => {
        // this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            var notilist= { 
              id: res.rows.item(i).id, 
              texts: JSON.parse(res.rows.item(i).texts), 
              body: JSON.parse(res.rows.item(i).body), 
              read: res.rows.item(i).read,
              dele: res.rows.item(i).dele,
              date:res.rows.item(i).date
            };
              this.Datanotilocal.push(notilist);
              // console.log("Get Notilocal");
          }
        }
      })
      .catch(e => {
        console.log("error view qr" + JSON.stringify(e))
      });
  }
  deleteNoti(id) {
    let data = [id];
    console.log('update notifaction !'+id);
    return this.storage.executeSql(`UPDATE notifaction SET dele = 1 WHERE id = ?`, data)
    .then(data => {
      console.log('update notifaction !');
    })
    .catch(e => {
      console.log("error view qr" + JSON.stringify(e))
    });
  }

  getNotiLocal2(){
    this.Datanotilocal2=[];
     this.storage.executeSql(`
      SELECT * FROM ${this.table_name3} WHERE read = 0.0 and dele = 0.0
      `, [])
      .then((res) => {
        // this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            var notilist= { 
              id: res.rows.item(i).id, 
              texts: res.rows.item(i).texts, 
              body: res.rows.item(i).body, 
              read: res.rows.item(i).read,
              date:res.rows.item(i).date
            };
              this.Datanotilocal2.push(notilist);
              // console.log("Get Notilocal");
          }
        }
      })
      .catch(e => {
        //alert("error view qr" + JSON.stringify(e))
      });
  }
  callNotiAgian(){
    this.getNotiJgrab().subscribe((response) => {
      this.NotiSql = response;
    })
  }
  CheckaddNoti(id){
    let data = [id];
    return this.storage.executeSql(`UPDATE notifaction SET read = 1 WHERE id = ?`, data)
    .then(data => {
      // console.log('update notifaction !');
    })
  }
  CheckPoin(){
    this.Datanoti=[];
    this.storage.executeSql(`
    SELECT * FROM ${this.table_name3} 
    `, []).then(res => { 
      //  if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          var datanotis={ 
            ids: res.rows.item(i).ids,
            url: res.rows.item(i).url,
            image: res.rows.item(i).image,
            title: res.rows.item(i).title,
            datetime: res.rows.item(i).datetime,
            read: res.rows.item(i).read
           };
           this.Datanoti.push(datanotis);
          //  console.log("Get Noti");
        }
    });
  }
  ///end Notifactiion

  /// API 
  getBanner(): Observable<Banner[]> {
    
    return this.httpClient.get<Banner[]>('http://133.18.200.97:448/api/get-banner')
      .pipe(
        tap(QRJgrab23 => console.log('banner retrieved!')),
        catchError(this.handleError<Banner[]>('banner QR', []))
      );
  }

  clickCoupon(id) {
    var data = {
      "id":id
    }
    this.httpClient.post('http://133.18.200.97:446/coupon/updateclick',data, this.httpOptions)
      .subscribe(data => {
        // console.log(data['_body']);
       });
  }
  clickQrcode(id) {
    var data = {
      "id":id
    }
    this.httpClient.post('http://133.18.200.97:446/qrcode/updateclick',data, this.httpOptions)
      .subscribe(data => {
        // console.log(data['_body']);
       });
  }

  getQrCodeJgrab(): Observable<QRJgrab[]> {
    
    return this.httpClient.get<QRJgrab[]>('http://133.18.200.97:448/api/get')
      .pipe(
        tap(QRJgrab23 => console.log('QR retrieved!')),
        catchError(this.handleError<QRJgrab[]>('Get QR', []))
      );
  }
  getQrCodeJgrabUser(): Observable<QRJgrab[]> {
    var user =this.name_model;
    // if(user.toString() != "1"){
      return this.httpClient.get<QRJgrab[]>('http://133.18.200.97:448/api/fetch-qr/'+user)
      .pipe(
        tap(_ => console.log('User fetched')),
        catchError(this.handleError<QRJgrab[]>(`Get user user`))
      );
    // }
  }


  addMergeCode(){
    var user12 =this.name_model;
    if(user12.toString() != "1"){
      console.log("xem");
      this.storage.executeSql(`
      SELECT * FROM ${this.table_name2} 
      `, [])
      .then((res) => {
        let itemsqr: Qrcode[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            var qrlist12= { 
              product_name:res.rows.item(i).format,
              url:res.rows.item(i).text,
              product_image:res.rows.item(i).cancelled,
              date_time:res.rows.item(i).datetime,
              user:this.name_model
            };
            console.log("xem12");
            this.httpClient.post('http://133.18.200.97:448/api/create-qr',JSON.stringify(qrlist12), this.httpOptions)
            .subscribe(data => {
              console.log("xem123");
            }, error => {
            });
          }
        }
      })
      .catch(e => {});
      this.deleteQR();
    }
    else{
      console.log("xem123");
    }
  }
  deleteQR() {
    return this.storage.executeSql(`DELETE FROM ${this.table_name2} `, [])
    .then(_ => {
      // console.log("delete");
    });
  }
  
  createQrCodeJgrab(notijgrab12) {
    // console.log("dataa"+JSON.stringify(qrcodejgrab));
    return this.httpClient.post('http://133.18.200.97:448/api/create-qr',JSON.stringify(notijgrab12), this.httpOptions)
      // .pipe(
      //   tap(QRJgrab23 => console.log('QR adddddddddd!')),
      //   catchError(this.handleError('Error occured'))
      // );
      .subscribe(data => {
        // console.log(data['_body']);
        this.getQrCodeJgrabUser();
       }, error => {
        // console.log(error);
      });
  }
  createQrNotiJgrab(qrcodejgrab) {
    // console.log("dataa"+JSON.stringify(qrcodejgrab));
    return this.httpClient.post('http://133.18.200.97:448/api/create-noti',JSON.stringify(qrcodejgrab), this.httpOptions)
      // .pipe(
      //   tap(QRJgrab23 => console.log('QR adddddddddd!')),
      //   catchError(this.handleError('Error occured'))
      // );
      .subscribe(data => {
        // console.log(data['_body']);
        this.getQrCodeJgrabUser();
       }, error => {
        // console.log(error);
      });
  }

  
  getCouponJgrab(): Observable<CounponJgrab[]> {
    
    return this.httpClient.get<CounponJgrab[]>('http://133.18.200.97:448/api/get-coupon')
      .pipe(
        tap(CouponJgrab23 => console.log('Coupon retrieved!')),
        catchError(this.handleError<CounponJgrab[]>('Get Coupon', []))
      );
  }
  getNotiJgrab(): Observable<NotiJgrab[]> {
    
    return this.httpClient.get<NotiJgrab[]>('http://133.18.200.97:448/api/get-noti')
      .pipe(
        tap(NotiJgrab23 => console.log('Noti retrieved local!')),
        catchError(this.handleError<NotiJgrab[]>('Get Noti', []))
      );
  }

  getFormJgrab(): Observable<FormJgrab[]> {
    console.log('123');
    return this.httpClient.get<FormJgrab[]>('http://133.18.200.97:448/api/get-form')
      .pipe(
        tap(getFormJgrab => console.log('Form retrieved!')),
        catchError(this.handleError<FormJgrab[]>('Get Form', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed1112: ${error.message}`);
      return of(result as T);
    };
  }  

  GetNotiqrcodejgrab() {
    var httpOptionsOne = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json' ,
        'Authorization':'Basic OGNmMmFiYzktMmIwMC00NGExLTg0ZmEtOTBhYzY4MTNlZTg2'
      })
    };
    // console.log("dataa"+JSON.stringify(qrcodejgrab));
    return this.httpClient.get('https://onesignal.com/api/v1/notifications?app_id=32fccb23-feb5-4663-87ab-c2ada6618795&limit=1',
    httpOptionsOne)
      // .pipe(
      //   tap(QRJgrab23 => console.log('QR adddddddddd!')),
      //   catchError(this.handleError('Error occured'))
      // );
      .subscribe(body => {
        var data =JSON.stringify(body);
        var student_obj = JSON.parse(data);
        if(student_obj.notifications.length>0){
          for(var z=0;z<student_obj.notifications.length;z++){
              console.log('tuyen1');
              var ids =student_obj.notifications[z].id;
              var headings =student_obj.notifications[z].headings.en;
              var contents =student_obj.notifications[z].contents.en;
              var completed_at =student_obj.notifications[z].completed_at;
              var ios_interruption_level =student_obj.notifications[z].ios_interruption_level;
              var isIos =student_obj.notifications[z].isIos;
              if(ios_interruption_level == "active" && isIos==true){
                this.saveNotiLocal(ids,headings,contents,completed_at);
              }
              
          }
        }
       }, error => {
        console.log(error);
      });
  }
  ///end  API 

  // fetchSongs(): Observable<Song[]> {
  //   return this.songsList.asObservable();
  // }
  // fetchQR(): Observable<Qrcode[]> {
  //   return this.QRList.asObservable();
  // }
  // Render fake data
  // getFakeData() {
  //   this.httpClient.get(
  //     'assets/showroom.sql', 
  //     {responseType: 'text'}
  //   ).subscribe(data => {
  //     this.sqlPorter.importSqlToDb(this.storage, data)
  //       .then(_ => {
  //         this.getSongs();
  //         this.isDbReady.next(true);
  //       })
  //       .catch(error => console.error(error));
  //   });
  // }
  // Get list
  getSongs(){
    this.Datasong=[];
    return this.storage.executeSql(`
    SELECT * FROM ${this.table_name} 
    `, []).then(res => {
      let items: Song[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          var songs={ 
            id: res.rows.item(i).id,
            artist_name: res.rows.item(i).artist_name
           };
          //  items.push(songs);
           this.Datasong.push(songs);
        }
      }
    });
    
  }
  // Get single object
  
  getSong() {
    this.Datasong1=[];
    this.name_model=[];
    return this.storage.executeSql(`
    SELECT * FROM ${this.table_name} WHERE id = 1
    `, []).then(res => { 
       let items: Song[] = [];
      //  if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          var songs={ 
            id: res.rows.item(i).id,
            artist_name: res.rows.item(i).artist_name
           };
          //  items.push(songs);
          this.Datasong1.push(songs);
          // console.log("song"+songs['artist_name']);
          this.name_model= songs['artist_name'];
          // console.log("song1"+this.name_model);
        }
    });
    //  this.name_model;
  }
  getQRId(){
    this.Dataqr=[];
     this.storage.executeSql(`
      SELECT * FROM ${this.table_name2} WHERE user = ? ORDER BY id DESC
      `, [this.name_model])
      .then((res) => {
        let itemsqr: Qrcode[] = [];
        // this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            var qrlist= { 
              id: res.rows.item(i).id, 
              text: res.rows.item(i).text, 
              format: res.rows.item(i).format, 
              cancelled: res.rows.item(i).cancelled, 
              datetime: res.rows.item(i).datetime
            };
              this.Dataqr.push(qrlist);
              console.log("Get QR ID");
          }
        }
      })
      .catch(e => {
        //alert("error view qr" + JSON.stringify(e))
      });
  }
  getQR1(){
      this.Dataqr=[];
     this.storage.executeSql(`
      SELECT * FROM ${this.table_name2} WHERE user = 1  ORDER BY id DESC
      `, [])
      .then((res) => {
        let itemsqr: Qrcode[] = [];
        // this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            var qrlist= { 
              id: res.rows.item(i).id, 
              text: res.rows.item(i).text, 
              format: res.rows.item(i).format, 
              cancelled: res.rows.item(i).cancelled, 
              datetime: res.rows.item(i).datetime
            };
              this.Dataqr.push(qrlist);
              // console.log("Get QR");
          }
        }
      })
      .catch(e => {
        //alert("error view qr" + JSON.stringify(e))
      });
    
    
      
  }
  getQR(){
      this.Dataqr=[];
     this.storage.executeSql(`
      SELECT * FROM ${this.table_name2}  ORDER BY id DESC
      `, [])
      .then((res) => {
        let itemsqr: Qrcode[] = [];
        // this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            var qrlist= { 
              id: res.rows.item(i).id, 
              text: res.rows.item(i).text, 
              format: res.rows.item(i).format, 
              cancelled: res.rows.item(i).cancelled, 
              datetime: res.rows.item(i).datetime
            };
              this.Dataqr.push(qrlist);
              console.log("Get QR storage");
          }
        }
      })
      .catch(e => {
        //alert("error view qr" + JSON.stringify(e))
      });
  }

  deleteqr() {
    return this.storage.executeSql('DELETE FROM qrtable ', [])
    .then(_ => {
      console.log('delete merge2 !');
    });
  }

  // Add
  addSong() {
    var artist_name = 1 ;
    var merge = 0;
    let data = [artist_name,merge];
    this.storage.executeSql(`
    INSERT INTO songtable (artist_name,merge) VALUES (?,?) `, data)
    .then(res => {
      // console.log('add song !');
      this.deleteSong();
      // this.getSongs();
    });
  }
  public qrcodejgrab ="";
  addQR(text, NameTitle,imgURL,datetime) {

    
    if (text == null || text == ""){
      // console.log('aaaaaaaaaaaaaaaaaaaaaaa');
      return false;
    }
    else {
      var qrcodejgrab ={
        product_name:NameTitle,
        url:text,
        product_image:imgURL,
        date_time:datetime,
        user:this.name_model
      };
      this.storage.executeSql(`
      SELECT * FROM ${this.table_name} WHERE id = 1
      `, []).then(res => { 
        let items: Song[] = [];
          for (var i = 0; i < res.rows.length; i++) { 
            var songs={ 
              id: res.rows.item(i).id,
              artist_name: res.rows.item(i).artist_name,
              merge: res.rows.item(i).merge
            };
            var user12 =this.name_model;
            if (songs['merge'] == 0 || user12.toString() == "1" ){
              this.Dataqr=[];
              let data = [text, NameTitle,imgURL,datetime,this.name_model];
              this.storage.executeSql('INSERT INTO qrtable (text,format,cancelled,datetime,user) VALUES (?, ?, ?, ?, ?)', data)
              .then(res => {
                this.getQR();
                console.log('add qr storage !');
              });
            }
            else {    
              if(user12.toString() != "1"){
                this.createQrCodeJgrab(qrcodejgrab);
                console.log('add qr môngo !')
              }
            }
          }
      });
      // var user12 =this.name_model;
      // if(user12.toString() != "1"){
      //   this.createQrCodeJgrab(qrcodejgrab);
      // }
      // else{
      //   this.Dataqr=[];
      //   let data = [text, NameTitle,imgURL,datetime,this.name_model];
      //   this.storage.executeSql('INSERT INTO qrtable (text,format,cancelled,datetime,user) VALUES (?, ?, ?, ?, ?)', data)
      //   .then(res => {
      //     console.log('add qr storage !');
      //   });
      // }
    }
    
  }
 
  
  // Update User
  updateSong(artist_name) {
    let data = [artist_name];
    return this.storage.executeSql(`UPDATE songtable SET artist_name = ? WHERE id = 1`, data)
    .then(data => {
      // if(artist_name.toString() != "1"){
      //   alert('1213');
      // }
      // else {
      //   alert('aaaaa');
      // }
      
      console.log('update user !');
    })
  }
  // Update Merge
  updateMerge() {

    var merge =1 ;
    let data = [merge];
    return this.storage.executeSql(`UPDATE songtable SET merge = ? WHERE id = 1`, data)
    .then(data => {
      console.log('update merge1 !');
    })

  }
  updateMerge2() 
  {
    var merge1 = 0;
      let data = [merge1];
      return this.storage.executeSql(`UPDATE songtable SET merge = ? WHERE id = 1`, data)
      .then(data => {
        console.log('update merge2 !');
      })
  }
  // Delete
  deleteSong() {
    return this.storage.executeSql('DELETE FROM songtable WHERE id > 1', [])
    .then(_ => {
      // if (artist_names !== "" || artist_names !== null){
       
      // }
      // else {
      //   alert('aaaa');
      // }
      // console.log("delete");
    });
  }
  saveCoockie(e:any){
    var string ="+"+e+"+";
    var a= string.slice(1,21);
    var b= string.slice(21,-1);
    return e;
  }
  public checkLogin(e){
    var string ="+"+e+"+";
    var a= string.slice(1,21);
    var b= string.slice(21,-1);
    return b;
  }
  public openWithCordovaBrowser(url){
    if(this.platform.is('ios')){
      var browser = this.theInAppBrowser.create(url,this.target2,this.options2);
    }else {
      var browser = this.theInAppBrowser.create(url,this.target,this.options);
    }
    
    browser.on('loadstop').subscribe((event) => {
        browser.executeScript({ 
          code:"\
          const form = document.getElementById('header_customer_login');\
          form.addEventListener('submit', function(event) { var a = document.getElementById('login-customer[email]').value; \
          var resutlObj =a; \
          var message = resutlObj;\
          var messageObj = {message: message};\
          var stringifiedMessageObj = JSON.stringify(messageObj);\
          window.webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj);\
          });\
          const form2 = document.getElementById('customer_login');\
          form2.addEventListener('submit', function(event) { var b = document.getElementById('customer[email]').value; \
          var resutlObj =b; \
          var message = resutlObj;\
          var messageObj = {message: message};\
          var stringifiedMessageObj = JSON.stringify(messageObj);\
          window.webkit.messageHandlers.cordova_iab.postMessage(stringifiedMessageObj);\
          });\
          "
        });
        browser.on('message').subscribe((event)=>{
          const postObject:any = event;
          var artist_names= postObject.data.message;
          console.log('đây là usser:'+ postObject.data.message);
          this.updateSong(artist_names);
          this.getQRId();
          //Do whatever you want to with postObject response from inappbrowser        
        });
        // get cookie string from webview
        this.getSong();
        
        // check session
        (window as any).cordova.plugins.CookiesPlugin.getCookie(
          url,
          async (cookies) => {
            // console.log("taco:"+cookies);
            var c= Number(cookies.lastIndexOf('secure_customer_sig'));
            var d= c+ 52;
            var e=cookies.slice(c,d);
            var string ="+"+e+"+";
            var a= string.slice(1,22);
            var b= string.slice(21,-1);
            var artist_names= b;
            // this.coockibrow=artist_names;
            var artist_name = 1 ;
              // if (a == "secure_customer_sig=;"){
                // merge data
                this.storage.executeSql(`
                SELECT * FROM ${this.table_name} WHERE id = 1
                `, []).then(res => { 
                  let items: Song[] = [];
                  //  if (res.rows.length > 0) {
                    for (var i = 0; i < res.rows.length; i++) { 
                      var songs={ 
                        id: res.rows.item(i).id,
                        artist_name: res.rows.item(i).artist_name,
                        merge: res.rows.item(i).merge
                      };
                      console.log("aaaaa"+artist_names);
                      console.log("aaaaa"+songs['artist_name']);
                      console.log("aaaaa"+typeof(songs['merge']));
                      var user12 =this.name_model;
                      if(a !=="secure_customer_sig=;" && songs['merge'] == 0){
                        if (songs['artist_name'].toString() != "1"  ){
                          this.alertController.create({
                            header: 'Do you want to add the scanned items to your Scan History?',
                            // subHeader: 'Beware lets confirm',
                            // message: 'Please change the selection to',
                            buttons: [
                              {
                                text: 'No',
                                handler: () => {
                                  this.deleteqr();
                                  console.log('Let me think0');
                                }
                              },
                              {
                                text: 'Yes',
                                handler: () => {
                                  this.addMergeCode();
                                  this.updateMerge();
                                  console.log('Let me think4');
                                }
                              }
                            ]
                          }).then(res => {
                            res.present();
                          });
                        }
                      }
                      else if( a =="secure_customer_sig=;" || user12.toString() == "1") {
                        console.log('Let me think1');
                        this.updateMerge2();
                      }
                      else{
                        console.log('Let me think2');
                        
                      }
                    }
                });
                
                //end merge
              // }
            if (a =="secure_customer_sig=;" || artist_names ==null){
              this.updateSong(artist_name);
              this.getQRId();
              this.getQrCodeJgrabUser();
            }
          });
          
      browser.insertCSS({ code: ".need_help {position: absolute;font-size: 22px;top: 0px;left: 50%;transform: translate(-50%);display: flex;justify-content: center;align-items: center ;height: 75px;color: white;background: #145a7b;width: 100%;} .back_btn {  text-decoration: underline;position: absolute; display:flex;align-items: center;height: 75px;font-size: 22px; top: 0px; left: 20px;color:#FFFFFF } #myvoya-sso-ui {padding-top: 75px;}" });
      });

  }

  //đang test thử nghiệm load ngầm 
  public urlcou= "https://j-coupon.com/shops/j-grab";
  public getCounpon( ){
    return new Promise(resolve => {
      this.http.get(this.urlcou)
        .subscribe(data => {
           
            // use data to build table...
        },error=>{
            console.log(error);
        });
      });
  }
  
  // quet ma qr code

  scannedData: any;
  encodedData: '';
  encodeData: any;
  mainForm: FormGroup;
  Data: any[] = [];
  // isOn = false;
  public options1 : InAppBrowserOptions = {
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
  public options12 : InAppBrowserOptions = {
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
  checkPermissionsForCamera() {
      this.diagnostic.isCameraAuthorized().then(cameraIsAuthorised => {
        if (cameraIsAuthorised) {
          console.log('1'+cameraIsAuthorised);
          this.goToBarcodeScan(); // etc....
        }
        else {

          console.log('2');
            this.diagnostic.requestCameraAuthorization().then(cameraAuthorisationGranted => {
                if (cameraAuthorisationGranted.toLowerCase() == 'authorized') {
                  console.log('3');
                  this.goToBarcodeScan(); // etc....
                }
                else {
                  console.log('4'+cameraAuthorisationGranted);
                  console.log('4a'+cameraAuthorisationGranted.toLowerCase());
                    // alert('Please go to your device settings and enable camera permissions.');
                    this.alertController.create({
                      header: 'Alert',
                      cssClass : 'custom',
                      message: 'Allow j-Grab Showroom to access your camera.<br> </br> This lets you scan the QR codes displayed in our showroom and access our website.',
                      buttons: [
                      
                        {
                          text: 'Yes',
                          handler: () => {
                            this.openNativeSettings.open('settings').then(val => {
                              console.log('success')
                            });
                          }
                        },
                        {
                          text: 'No',
                          handler: () => {
                            console.log('Let me think4');
                          }
                        }
                      ]
                    }).then(res => {
                      res.present();
                    });
                }
            });
        }
    });
  }
  
  goToBarcodeScan() {
    
    var barcodeData12= 'https://www.facebook.com/';
    this.getSong();
    const options: BarcodeScannerOptions = {
      
      showTorchButton: true,
      torchOn: false,
      resultDisplayDuration: 0,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417',
      orientation: 'portrait', 
      preferFrontCamera: false,
      showFlipCameraButton: false,
      disableAnimations:true,
      disableSuccessBeep:true,
      saveHistory : false,
      
      prompt: 'Place a QrCode inside the scan area',
      
      // disableSuccessBeep	boolean	Tắt tiếng bíp thành công. Chỉ hỗ trợ trên iOS.

    };
    
    this.barcodeCtrl.scan(options).then(barcodeData => {
      // if (barcodeData.cancelled == true) {
      //   this.navCtrl.pop()
      // }
      // else {

      
        this.scannedData = barcodeData;
        
        // console.log("kết quả"+ barcodeData);
        
        if(barcodeData['text'] == null || barcodeData['text'] == "" ){
          // console.log('11111111111111111');
          return false;
        }
        else {
          if(this.platform.is('ios')){
            var browser = this.iab.create(barcodeData['text'],this.target2,this.options12);
          }
          else 
          {
            var browser = this.iab.create(barcodeData['text'],this.target,this.options1);
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
          this.getQR();
          this.getQrCodeJgrabUser();
        }
      // }
    }).catch(err => {
      // BarcodeScanner.st;
      // return;
    // if(err=="Scan is already in progress"){

    // }
      // this.location.back();
      // this.checkPermissionsForCamera();
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
  
  storeDataQR(barcodeData,imgURL,NameTitle) {
    var date = new Date();
    this.addQR(
      barcodeData['text'],
      NameTitle,
      imgURL,
      this.datePipe.transform(date, 'dd-MM-yyyy  hh:mm:ss')
    )
  }
  public count: number = 0;
  public counttotal: number = 0;

  public countNumber(){
    
    this.counttotal = this.count + 1;
    console.log("tổng  " + this.counttotal);
    console.log(JSON.stringify(this.count));
  }
}
