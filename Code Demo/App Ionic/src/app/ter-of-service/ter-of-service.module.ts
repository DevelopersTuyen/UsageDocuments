import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerOfServicePageRoutingModule } from './ter-of-service-routing.module';

import { TerOfServicePage } from './ter-of-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerOfServicePageRoutingModule
  ],
  declarations: [TerOfServicePage]
})
export class TerOfServicePageModule {}
