import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { TeamCreateComponent } from './team/team-create/team-create.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventCreateComponent } from './events/event-create/event-create.component';


const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'create',
    component: CreateUserComponent
  },
  {
    path: 'teams',
    component: TeamListComponent
  },
  {
    path: 'team/create',
    component: TeamCreateComponent
  },
  {
    path: 'auth',
    component: LoginComponent
  },
  {
    path: 'sign-up-admin',
    component: SignUpComponent
  },
  {
    path: 'events',
    component: EventsListComponent
  },
  {
    path: 'event/create',
    component: EventCreateComponent
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
