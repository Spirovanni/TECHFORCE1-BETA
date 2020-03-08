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

import {LandingComponent} from './pages/landing/landing.component'
import {PagesComponent} from "./pages/pages.component";


const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full',
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
    path: 'pages',
    component: PagesComponent, children: [
      { path: '', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule), data: { breadcrumb: 'Admin' }},
      { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule), data: { breadcrumb: 'Users' } },
      { path: 'ui', loadChildren: () => import('./pages/ui/ui.module').then(m => m.UiModule), data: { breadcrumb: 'UI' } },
      { path: 'dynamic-menu', loadChildren: () => import('./pages/dynamic-menu/dynamic-menu.module').then(m => m.DynamicMenuModule), data: { breadcrumb: 'Dynamic Menu' }  },
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
    path: '**', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard],
    runGuardsAndResolvers: 'always'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
