
import { Routes, RouterModule } from '@angular/router';
import { CourseContainerComponent } from './pages/course-container/course-container.component';
import { ListCourseComponent } from './pages/list-course/list-course.component';
import { AddCourseComponent } from './pages/add-course/add-course.component';
const routes: Routes = [
  {
    path: '', component: CourseContainerComponent,
    children: [
      {
        path: 'list', component: ListCourseComponent
      },
      {
        path: 'add', component: AddCourseComponent
      }
    ]
  },
];

export const CourseRoutes = RouterModule.forChild(routes);
