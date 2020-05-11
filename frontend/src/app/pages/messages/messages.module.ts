import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../../shared/shared.module';
import { DashMessageListComponent } from './message-list/dash-message-list.component';
import { DashMessageFormComponent } from './message-form/dash-message-form.component';
import {AuthGuard} from '../../auth.guard';
import {UserResolver} from '../../resolver/user.resolver';
import {HabitResolver} from '../../resolver/habit.resolver';
import {HabitUserResolver} from '../../resolver/habit-user.resolver';
import {CurrentUserResolver} from '../../resolver/current-user.resolver';
import {AdminGuard} from '../../admin.guard';
import {TypesResolver} from "../../resolver/types.resolver";
import {UsersResolver} from "../../resolver/users.resolver";


export const routes = [
  {
    path: '',
    redirectTo: 'message-list',
    pathMatch: 'full'
  },
  {
    path: 'message-list',
    component: DashMessageListComponent,
    data: { breadcrumb: 'Message List' },
    canActivate: [AuthGuard],
    resolve: {habits: HabitUserResolver, typeOptions: TypesResolver, user: CurrentUserResolver, users: UsersResolver},
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'message-form',
    component: DashMessageFormComponent,
    data: { breadcrumb: 'Message Form' },
    canActivate: [AuthGuard],
    resolve: {habits: HabitUserResolver, typeOptions: TypesResolver, user: CurrentUserResolver, users: UsersResolver},
    // runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule],
  declarations: [
    DashMessageListComponent,
    DashMessageFormComponent
  ]
})
export class DashMessageListModule { }
