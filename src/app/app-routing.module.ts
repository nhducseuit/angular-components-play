import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/matstepper-play', pathMatch: 'full' },
  { path: 'matstepper-play', loadChildren: './matstepper-play/matstepper-play.module#MatstepperPlayModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
