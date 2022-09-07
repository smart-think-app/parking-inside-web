import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth-guard.guard';
import { ParkingGuard } from './core/guards/parking/parking-guard.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'parking',
    canActivate: [ParkingGuard],
    loadChildren: () => import('./pages/parking/parking.module').then(m => m.ParkingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
