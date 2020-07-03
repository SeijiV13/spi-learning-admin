
import { Routes, RouterModule } from '@angular/router';
import { UserContainerComponent } from './pages/user-container/user-container.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
const routes: Routes = [
  {
    path: '', component: UserContainerComponent,
    children: [
      {
        path: 'list', component: ListUserComponent
      },
      {
        path: 'add', component: AddUserComponent
      },
      {
        path: 'update', component: UpdateUserComponent
      }
    ]
  },
];

export const UserRoutes = RouterModule.forChild(routes);
