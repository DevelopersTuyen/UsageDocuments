import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryqrPage } from './historyqr.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryqrPageRoutingModule {}
