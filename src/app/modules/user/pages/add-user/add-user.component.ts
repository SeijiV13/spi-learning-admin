import { CourseService } from './../../../../core/services/course.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from './../../../../core/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  form: FormGroup;
  listCourses: [];
  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private userService: UserService,
              private courseService: CourseService,
              private loader: NgxUiLoaderService) { }

  ngOnInit() {
    this.initializeForm();
    this.addCourse();
    this.getListCourses();
  }

  initializeForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      apiKey: ['', Validators.required],
      batchNumber: ['', Validators.required],
      branch: ['', Validators.required],
      province: ['', Validators.required],
      region: ['', Validators.required],
      expiration: ['', Validators.required],

      courses: this.fb.array([

      ])
    });
  }

  getListCourses() {
    this.courseService.getCourse().subscribe((data) => {
      this.listCourses = data;
    });
  }

  get courses(): FormArray {
    return this.form.get('courses') as FormArray;
  }

  newCourse() {
    return this.fb.group({
      course: ['', Validators.required]
    });
  }

  addCourse() {
      this.courses.push(this.newCourse());
  }

  deleteCourse(i) {
    ((this.form.controls.courses as FormArray)).controls.splice(i, 1);
  }

  createUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastr.error('There are errors on the form', 'Form Invalid');
      return;
    } else {
      this.loader.start();
      const user = {
        name: this.form.controls.name.value,
        username: this.form.controls.username.value,
        role: this.form.controls.role.value,
        password: this.form.controls.password.value,
        apiKey: this.form.controls.apiKey.value,
        batchNumber: this.form.controls.batchNumber.value,
        branch: this.form.controls.branch.value,
        province: this.form.controls.province.value,
        region: this.form.controls.region.value,
        expiration: this.form.controls.expiration.value,
        courses: [],
      };
      for (const course of this.courses.controls) {
        user.courses.push(course.value.course);
      }
      this.userService.createUser(user).subscribe((data) => {
        this.loader.stop();
        this.toastr.success('Successfully added user', 'Success!');
        this.router.navigate(['/home/users/list']);
    });

    }

  }

  back() {
    this.router.navigate(['/home/users/list']);
  }
}
