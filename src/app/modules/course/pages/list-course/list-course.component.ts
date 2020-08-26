import { CourseService } from './../../../../core/services/course.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {
  courses: [];
  constructor(private router: Router,
              private courseService: CourseService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getCourses();
  }

  addCourse() {
    this.router.navigate(['/home/courses/add']);
  }

  getCourses() {
     this.courseService.getCourse().subscribe((data) => {
       this.courses = data;
     });
  }

  deleteCourse(id) {
    this.courseService.deleteCourse(id).subscribe((data) => {
      this.toastr.success('Successfully deleted course', 'Success!');
      this.getCourses();
    });
  }

  updateCourse(course, i) {
    const input = document.getElementById(`${i}-uc`) as any;
    this.courseService.updateCourse(course.id, input.value).subscribe((data) => {
      this.toastr.success('Successfully updated course', 'Success!');
    });
  }

}
