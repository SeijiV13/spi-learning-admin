import { LoginContainerComponent } from './pages/login-container/login-container.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: LoginContainerComponent
   },
];

export const LoginRoutes = RouterModule.forChild(routes);
