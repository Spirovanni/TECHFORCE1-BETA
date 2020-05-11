import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../../shared/shared.module';
import { DashHabitListComponent } from './main/habit-list.component';
import {AuthGuard} from '../../auth.guard';
import {UserResolver} from '../../resolver/user.resolver';
import {HabitResolver} from '../../resolver/habit.resolver';
import {HabitUserResolver} from '../../resolver/habit-user.resolver';
import {CurrentUserResolver} from '../../resolver/current-user.resolver';
import {AdminGuard} from '../../admin.guard';
import {TypesResolver} from "../../resolver/types.resolver";
import {UsersResolver} from "../../resolver/users.resolver";
import {DashHabitFormComponent} from "./habit-form/dash-habit-form.component";
// import { BubbleComponent } from './bubble/bubble.component';
// import { LineComponent } from './line/line.component';
// import { PieComponent } from './pie/pie.component';

export const routes = [
  {
    path: '',
    redirectTo: 'habit-list',
    pathMatch: 'full'
  },
  {
    path: 'habit-list',
    component: DashHabitListComponent,
    data: { breadcrumb: 'Habit List' },
    canActivate: [AuthGuard],
    resolve: {habits: HabitUserResolver, typeOptions: TypesResolver, user: CurrentUserResolver, users: UsersResolver},
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'habit-form',
    component: DashHabitFormComponent,
    data: { breadcrumb: 'Habit Form' },
    canActivate: [AuthGuard],
    resolve: {habits: HabitUserResolver, typeOptions: TypesResolver, user: CurrentUserResolver, users: UsersResolver},
    // runGuardsAndResolvers: 'always'
  },
  // { path: 'pie', component: PieComponent, data: { breadcrumb: 'Pie Charts' } },
  // { path: 'line', component: LineComponent, data: { breadcrumb: 'Line Charts' } },
  // { path: 'bubble', component: BubbleComponent, data: { breadcrumb: 'Bubble Charts' } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule],
  declarations: [
    DashHabitListComponent
    // BubbleComponent,
    // LineComponent,
    // PieComponent
  ]
})
export class DashHabitListModule { }
