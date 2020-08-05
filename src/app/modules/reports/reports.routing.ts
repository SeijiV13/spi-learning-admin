import { ListUserReportsComponent } from './pages/list-user-reports/list-user-reports.component';

import { Routes, RouterModule } from '@angular/router';
import { ReportsContainerComponent } from './pages/reports-container/reports-container.component';
const routes: Routes = [
  {
    path: '', component: ReportsContainerComponent,
    children: [
      {
        path: 'list', component: ListUserReportsComponent
      },
    ]
  },
];

export const ReportsRoutes = RouterModule.forChild(routes);
