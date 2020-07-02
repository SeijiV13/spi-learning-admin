
import { HomeRoutes } from './home.routing';
import { HomeContainerComponent } from './pages/home-container/home-container.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'ng-sidebar';
import { NavbarComponent } from 'src/app/core/components/navbar/navbar.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptor } from 'src/app/core/interceptors/apikey.interceptor';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [HomeContainerComponent, NavbarComponent],
  imports: [
    CommonModule,
    HomeRoutes,
    NgbModule,
    NgxUiLoaderModule,
    ToastrModule,
    NgxBootstrapIconsModule.pick(allIcons),
    SidebarModule.forRoot()
  ], providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiKeyInterceptor,
    multi: true}]
})
export class HomeModule { }
