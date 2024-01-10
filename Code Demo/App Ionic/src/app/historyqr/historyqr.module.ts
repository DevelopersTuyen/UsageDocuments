import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryqrPageRoutingModule } from './historyqr-routing.module';

import { HistoryqrPage } from './historyqr.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DbService } from './../services/db.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryqrPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HistoryqrPage] ,
  providers: [
    SQLite,
    DbService
  ]
})
export class HistoryqrPageModule {}
