import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerOfServicePage } from './ter-of-service.page';

const routes: Routes = [
  {
    path: '',
    component: TerOfServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerOfServicePageRoutingModule {}
