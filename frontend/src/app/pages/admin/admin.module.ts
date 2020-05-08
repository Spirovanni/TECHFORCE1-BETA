import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AdminComponent, DashboardHabitEditComponent, PasswordChangeComponentDash, UserDataChangeComponent } from './admin.component';
import { TilesComponent } from './tiles/tiles.component';
import { InfoCardsComponent } from './info-cards/info-cards.component';
import { DiskSpaceComponent } from './disk-space/disk-space.component';
import { TodoComponent } from './todo/todo.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TeamComponent } from './team/team.component';

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
    AdminComponent,
    DashboardHabitEditComponent,
    PasswordChangeComponentDash,
    UserDataChangeComponent,
    TilesComponent,
    InfoCardsComponent,
    DiskSpaceComponent,
    TodoComponent,
    AnalyticsComponent,
    TeamComponent
  ]
})
export class AdminModule { }
