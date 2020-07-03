import { AddUserComponent } from './pages/add-user/add-user.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContainerComponent } from './pages/user-container/user-container.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'ng-sidebar';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptor } from 'src/app/core/interceptors/apikey.interceptor';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { UserRoutes } from './user.routing';
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgxUiLoaderModule,
    ToastrModule,
    UserRoutes,
    NgxBootstrapIconsModule.pick(allIcons),
    SidebarModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ], providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiKeyInterceptor,
    multi: true}],
  declarations: [UserContainerComponent, ListUserComponent, AddUserComponent, UpdateUserComponent],
})
export class UserModule { }
