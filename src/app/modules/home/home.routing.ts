import { HomeContainerComponent } from './pages/home-container/home-container.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: HomeContainerComponent,
    children: [
      {
        path: 'courses', loadChildren:() => import('../course/course.module').then((m) => m.CourseModule)
      },
      {
        path: 'users', loadChildren: () => import('../user/user.module').then((m) => m.UserModule)
      },
      {
        path: 'videos', loadChildren: () => import('../video/video.module').then((m) => m.VideoModule)
      },
      {
        path: 'reports', loadChildren: () => import('../reports/reports.module').then((m) => m.ReportsModule)
      }
    ]
  },
];

export const HomeRoutes = RouterModule.forChild(routes);
