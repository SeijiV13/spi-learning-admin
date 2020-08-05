import { ListUserReportsComponent } from './pages/list-user-reports/list-user-reports.component';
import { ReportsContainerComponent } from './pages/reports-container/reports-container.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { UserRoutes } from '../user/user.routing';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { SidebarModule } from 'ng-sidebar';
import { ReportsRoutes } from './reports.routing';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ReportsRoutes,
    NgxUiLoaderModule,
    ToastrModule,
    UserRoutes,
    NgxBootstrapIconsModule.pick(allIcons),
    SidebarModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ReportsContainerComponent, ListUserReportsComponent]
})
export class ReportsModule { }
