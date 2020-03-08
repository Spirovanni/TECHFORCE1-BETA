import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AdminComponent } from './admin.component';

export const routes = [
  { path: '', component: AdminComponent, pathMatch: 'full' }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    NgxChartsModule,
    PerfectScrollbarModule
  ],
  declarations: [
    AdminComponent
  ]
})
export class AdminModule { }
