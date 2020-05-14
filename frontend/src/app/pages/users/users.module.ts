import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './user-list/users-list.component'
import { UsersData } from './users.data';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { AuthGuard } from "../../auth.guard";
import { HabitUserResolver } from "../../resolver/habit-user.resolver";
import { TypesResolver } from "../../resolver/types.resolver";
import { CurrentUserResolver } from "../../resolver/current-user.resolver";
import { UsersResolver } from "../../resolver/users.resolver";


// export const routes = [
//   { path: '', component: UsersComponent, pathMatch: 'full' },
//   { path: '', component: UsersListComponent, }
// ];

export const routes = [
  {
    path: '',
    redirectTo: 'users-list',
    pathMatch: 'full'
  },
  {
    path: 'users-list',
    component: UsersListComponent,
    data: { breadcrumb: 'Users List' },
    canActivate: [AuthGuard],
    resolve: {habits: HabitUserResolver, typeOptions: TypesResolver, user: CurrentUserResolver, users: UsersResolver},
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'users-dashboard',
    component: UsersComponent,
    data: { breadcrumb: 'User Dashboard' },
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
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(UsersData, { delay: 500 }),
    NgxPaginationModule,
    SharedModule,
    PipesModule
  ],
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserDialogComponent
  ],
  entryComponents:[
    UserDialogComponent
  ]
})
export class UsersModule { }
