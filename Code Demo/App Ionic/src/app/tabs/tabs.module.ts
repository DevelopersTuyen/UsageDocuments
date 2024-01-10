import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
// import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
// import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
// import { SQLite } from '@ionic-native/sqlite';
import { Location,DatePipe  } from '@angular/common';
import { DbService } from './../services/db.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage] ,
  providers: [
    DbService,
    
    DatePipe
  ]
})
export class TabsPageModule {
  
  public userName:'dudeptrei';
}
