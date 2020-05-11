/** ****************************************************************************
 * app-routing.module.ts Copyright ©️ 2020 by the HabitRabbit developers (ardianq, lachchri16, sweiland, YellowIcicle).
 ******************************************************************************/

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from './auth.guard';
import {FaqComponent} from './faq/faq.component';
import {HabitFormComponent} from './habit-form/habit-form.component';
import {HabitListComponent} from './habit-list/habit-list.component';
import {MessageFormComponent} from './message-form/message-form.component';
import {MessageListComponent} from './message-list/message-list.component';
import {ProfilePictureFormComponent} from './profile-picture-form/profile-picture-form.component';
import {RegisterComponent} from './register/register.component';
import {TypeFormComponent} from './type-form/type-form.component';
import {TypeListComponent} from './type-list/type-list.component';
import {UserListComponent} from './user-list/user-list.component';
import {UsersResolver} from './resolver/users.resolver';
import {TypesResolver} from './resolver/types.resolver';
import {TypeResolver} from './resolver/type.resolver';
import {UserFormComponent} from './user-form/user-form.component';
import {UserResolver} from './resolver/user.resolver';
import {HabitResolver} from './resolver/habit.resolver';
import {HabitUserResolver} from './resolver/habit-user.resolver';
import {CurrentUserResolver} from './resolver/current-user.resolver';
import {AdminGuard} from './admin.guard';

import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';

import { Tf1Component } from './tf1/tf1.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'landing', pathMatch: 'full',
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'register', component: RegisterComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'login', component: LoginComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'home', component: HomeComponent,
    runGuardsAndResolvers: 'always'
  },
  { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },

  {
    path: 'tf1',
    component: Tf1Component, children: [
      { path: 'dashboard', loadChildren: () => import('./tf1/dashboard/dashboard.module').then(m => m.DashboardModule), data: { breadcrumb: 'Dashboard' }},
  ]
  },

  {
    path: 'pages',
    component: PagesComponent, children: [
      { path: '', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule), data: { breadcrumb: 'Admin' }},
      { path: 'habit-dashboard', loadChildren: () => import('./pages/habit-dashboard/habit-dashboard.module').then(m => m.HabitDashboardModule), data: { breadcrumb: 'Habit Dashboard' } },
      { path: 'habit-list', loadChildren: () => import('./pages/habit-list/habit-list.module').then(m => m.DashHabitListModule), data: { breadcrumb: 'Habit List' } },
      { path: 'messages', loadChildren: () => import('./pages/messages/messages.module').then(m => m.DashMessageListModule), data: { breadcrumb: 'Messages' } },
      { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule), data: { breadcrumb: 'Users' } },
      { path: 'ui', loadChildren: () => import('./pages/ui/ui.module').then(m => m.UiModule), data: { breadcrumb: 'UI' } },
      { path: 'dynamic-menu', loadChildren: () => import('./pages/dynamic-menu/dynamic-menu.module').then(m => m.DynamicMenuModule), data: { breadcrumb: 'Dynamic Menu' }  },
      { path: 'mailbox', loadChildren: () => import('./pages/mailbox/mailbox.module').then(m => m.MailboxModule), data: { breadcrumb: 'Mailbox' } },
      { path: 'chat', loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule), data: { breadcrumb: 'Chat' } },
      { path: 'form-controls', loadChildren: () => import('./pages/form-controls/form-controls.module').then(m => m.FormControlsModule), data: { breadcrumb: 'Form Controls' } },
      { path: 'tables', loadChildren: () => import('./pages/tables/tables.module').then(m => m.TablesModule), data: { breadcrumb: 'Tables' } },
      { path: 'schedule', loadChildren: () => import('./pages/schedule/schedule.module').then(m => m.ScheduleModule), data: { breadcrumb: 'Schedule' } },
      { path: 'maps', loadChildren: () => import('./pages/maps/maps.module').then(m => m.MapsModule), data: { breadcrumb: 'Maps' } },
      { path: 'charts', loadChildren: () => import('./pages/charts/charts.module').then(m => m.ChartsModule), data: { breadcrumb: 'Charts' } },
      { path: 'drag-drop', loadChildren: () => import('./pages/drag-drop/drag-drop.module').then(m => m.DragDropModule), data: { breadcrumb: 'Drag & Drop' } },
      { path: 'icons', loadChildren: () => import('./pages/icons/icons.module').then(m => m.IconsModule), data: { breadcrumb: 'Material Icons' } },
      { path: 'profile', loadChildren: () => import ('./pages/profile/profile.module').then(m => m.ProfileModule), data: { breadcrumb: 'Profile' } },
      { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
      { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } },
      { path: 'search/:name', component: SearchComponent, data: { breadcrumb: 'Search' } }
    ]
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {habits: HabitUserResolver, typeOptions: TypesResolver, user: CurrentUserResolver, users: UsersResolver},
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'faq', component: FaqComponent, canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'habit-form', component: HabitFormComponent, canActivate: [AuthGuard, AdminGuard],
    resolve: {memberOptions: UsersResolver, typeOptions: TypesResolver},
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'habit-form/:id', component: HabitFormComponent, canActivate: [AuthGuard, AdminGuard], resolve: {
      habit: HabitResolver,
      memberOptions: UsersResolver, typeOptions: TypesResolver
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'habit-list', component: HabitListComponent, canActivate: [AuthGuard, AdminGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'message-form', component: MessageFormComponent, canActivate: [AuthGuard, AdminGuard], resolve: {typeOptions: TypesResolver},
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'message-form/:id', component: MessageFormComponent, canActivate: [AuthGuard, AdminGuard], resolve: {typeOptions: TypesResolver},
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'message-list', component: MessageListComponent, canActivate: [AuthGuard, AdminGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'profile-picture-form', component: ProfilePictureFormComponent, canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'type-form', component: TypeFormComponent, canActivate: [AuthGuard, AdminGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'type-form/:id', component: TypeFormComponent, canActivate: [AuthGuard, AdminGuard], resolve: {type: TypeResolver},
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'type-list', component: TypeListComponent, canActivate: [AuthGuard, AdminGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'user-list', component: UserListComponent, canActivate: [AuthGuard, AdminGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'user-form', component: UserFormComponent, canActivate: [AuthGuard, AdminGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'user-form/:id', component: UserFormComponent, canActivate: [AuthGuard, AdminGuard], resolve: {user: UserResolver},
    runGuardsAndResolvers: 'always'
  },
  {
    path: '**', component: PagesComponent, canActivate: [AuthGuard, AdminGuard],
    runGuardsAndResolvers: 'always'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
