import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../shared/shared.module';

import {AuthGuard} from '../auth.guard';
import {UserResolver} from '../resolver/user.resolver';
import {HabitResolver} from '../resolver/habit.resolver';
import {HabitUserResolver} from '../resolver/habit-user.resolver';
import {CurrentUserResolver} from '../resolver/current-user.resolver';
import {AdminGuard} from '../admin.guard';
import {TypesResolver} from "../resolver/types.resolver";
import {UsersResolver} from "../resolver/users.resolver";
import {MessageFormComponent} from "./message-form.component";
// import { BubbleComponent } from './bubble/bubble.component';
// import { LineComponent } from './line/line.component';
// import { PieComponent } from './pie/pie.component';

export const routes = [
  {
    path: '',
    redirectTo: 'new-habit',
    pathMatch: 'full'
  },
  {
    path: 'new-habit',
    component: MessageFormComponent,
    data: { breadcrumb: 'New Habit' },
    canActivate: [AuthGuard],
    resolve: {habits: HabitUserResolver, typeOptions: TypesResolver, user: CurrentUserResolver, users: UsersResolver},
    // runGuardsAndResolvers: 'always'
  },
  // {
  //   path: 'habit-form',
  //   component: DashHabitFormComponent,
  //   data: { breadcrumb: 'Habit Form' },
  //   canActivate: [AuthGuard],
  //   resolve: {habits: HabitUserResolver, typeOptions: TypesResolver, user: CurrentUserResolver, users: UsersResolver},
  //   // runGuardsAndResolvers: 'always'
  // },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule],
  declarations: [
    MessageFormComponent
    // BubbleComponent,
    // LineComponent,
    // PieComponent
  ]
})
export class MessageFormModule { }
