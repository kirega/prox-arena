import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { TeamListComponent } from './team/team-list/team-list.component';
import { TeamCreateComponent } from './team/team-create/team-create.component';


const routes: Routes = [
  {
    path: '',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
