import { ShipItemPageComponent } from './ship-item-page/ship-item-page.component';
import { ShipsPageComponent } from './ships-page/ships-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ShipsPageComponent },
  { path: 'ship/:id', component: ShipItemPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
