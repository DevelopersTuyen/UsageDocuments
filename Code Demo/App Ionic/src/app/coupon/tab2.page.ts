import { Component, ViewChild } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { DbService } from './../services/db.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { IonInfiniteScroll, IonVirtualScroll } from '@ionic/angular';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  CouponJgrab: any = [];
  hide:boolean = true;
  cp: number = 1;
  public config: any;
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public newContent:any;
  public html=" <style>.popup{display:block;} <style>";
  public html2= "<style>.popup{display:none;} <style>";

  public labels: any = {
      previousLabel: '<--',
      nextLabel: '-->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  dataList = [];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
  
  constructor(
    public sanitizer: DomSanitizer,
    public db:DbService ,
    public clipboard: Clipboard
    ) 
  {
    this.checkdata();
    // this.db.getCouponJgrab().subscribe((response) => {
    //   this.CouponJgrab = response;
    //   var count1 = response.filter((obj) => obj.coupon_code).length;
    //   // console.log(count);
    //   var collection = { count: count1, response: [] };
    //   // console.log( response);
    //   for (var i = 0; i < collection.count; i++) {
    //     collection.response.push(
    //       { 
    //         coupon_expiry: collection.response['coupon_expiry'],
    //         id: i + 1,
    //         value: "items number " + (i + 1)
    //       }
    //     );
    //   }
  
    //   this.config = {
    //     itemsPerPage:5,
    //     currentPage: 1,
    //     totalItems: collection.count
    //   };
    // })

    this.getEmployees();
  }
  copyString(coupon_code){
    this.clipboard.copy(coupon_code);
    alert('Successfully Copied!');
  }
  pasteString(){
    this.clipboard.paste().then(
      (resolve: string) => {
         alert(resolve);
       },
       (reject: string) => {
         alert('Error: ' + reject);
       }
     );
    console.log('12343');
  }
  
  getEmployees() {
    this.db.getCouponJgrab().subscribe((response) => {
      // this.dataList =response;
      this.dataList=response
      // for (let i = 0; i < this.dataList.length; i++) {
        
      // }
    });
    
  }

  loadData(event) {
    setTimeout(() => {
      this.getEmployees()
      event.target.complete();
      // this.virtualScroll.checkEnd();
      if (this.dataList.length == 1000) {
        event.target.disabled = true;
        console.log("1");
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  public checkdata(){
      this.db.getCouponJgrab().subscribe((response) => {
        this.dataList = response;
      })
  }
  // show:boolean = false;
  show: {[key: number]: boolean} = {};
  public ngIfCtrl(index: number){
    if(this.show[index] == true) {
      this.show[index] = false;
    }else{
      this.show[index] = true
    }
  }
  public openViewCode(url){
    this.db.openWithCordovaBrowser(url);
  }
  getList(event) {
    event.target.complete();
    this.checkdata();
  }
  public goToBarcodeScan(){
    this.db.goToBarcodeScan();
  }
  public checkCamera(){
    this.db.checkPermissionsForCamera();
  }
  public clickCoupon(id){
    console.log(id);
    this.db.clickCoupon(id);
  }
  public clickQr(id){
    this.db.clickQrcode(id);
  }
}
