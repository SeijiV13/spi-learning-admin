import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'ng-sidebar';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptor } from 'src/app/core/interceptors/apikey.interceptor';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { VideoContainerComponent } from './pages/video-container/video-container.component';
import { VideoRoutes } from './video.routing';
import { NgxSortableModule } from 'ngx-sortable';
@NgModule({
  declarations: [VideoContainerComponent],
  imports: [
    NgxSortableModule,
    CommonModule,
    NgbModule,
    NgxUiLoaderModule,
    ToastrModule,
    VideoRoutes,
    NgxBootstrapIconsModule.pick(allIcons),
    SidebarModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ], providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiKeyInterceptor,
    multi: true}]
})
export class VideoModule { }
