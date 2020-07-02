import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCourseComponent } from './pages/add-course/add-course.component';
import { CourseRoutes } from './course.routing';
import { NgModule } from '@angular/core';
import { CourseContainerComponent } from './pages/course-container/course-container.component';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'ng-sidebar';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptor } from 'src/app/core/interceptors/apikey.interceptor';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { ListCourseComponent } from './pages/list-course/list-course.component';
@NgModule({
  declarations: [CourseContainerComponent, ListCourseComponent, AddCourseComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgxUiLoaderModule,
    ToastrModule,
    CourseRoutes,
    NgxBootstrapIconsModule.pick(allIcons),
    SidebarModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ], providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiKeyInterceptor,
    multi: true}]
})
export class CourseModule { }
