import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CourseService } from './../../../../core/services/course.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private courseService: CourseService,
              private loader: NgxUiLoaderService) { }

  ngOnInit() {
    this.initializeForm();
    this.addCourse();
  }
  initializeForm() {
    this.form = this.fb.group({
      courses: this.fb.array([

      ])
    });
  }

  get courses(): FormArray {
    return this.form.get('courses') as FormArray;
  }

  newCourse() {
    return this.fb.group({
      course: ['', Validators.required],
      numberOfUc: ['', Validators.required],
      downloadable: ['']
    });
  }

  addCourse() {
      this.courses.push(this.newCourse());
  }

  deleteCourse(i) {
    ((this.form.controls.courses as FormArray)).controls.splice(i, 1);
  }

  createCourse() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastr.error('There are errors on the form', 'Form Invalid');
      return;
    } else {
      this.loader.start();
      for (const course of this.courses.controls) {
         const subs = [];
         subs.push(this.courseService.createCourse({ name: course.value.course, numberOfUc: course.value.numberOfUc,
          downloadable: course.value.downloadable}));
         forkJoin(subs).subscribe((data) => {
          this.loader.stop();
          this.toastr.success('Successfully added course/s', 'Success!');
          this.router.navigate(['/home/courses/list']);
        });
      }


    }

  }

  back() {
    this.router.navigate(['/home/courses/list']);
  }
}
