import { CourseService } from './../../../../core/services/course.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from './../../../../core/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
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
    this.getListCourses();
    this.getUser();
  }

  initializeForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      username: ['', Validators.required],
      role: ['', Validators.required],
      apiKey: ['', Validators.required],
      status: [''],
      createdAt: [''],
      expiration: [''],
      lastLoggedIn: [''],
      batchNumber: ['', Validators.required],
      branch: ['', Validators.required],
      province: ['', Validators.required],
      region: ['', Validators.required],
      courses: this.fb.array([

      ])
    });

  }

  getUser() {
    this.userService.getUser(localStorage.getItem('idus')).subscribe((data) => {
      this.form.patchValue(data);
      for (const course of data.courses) {
        this.addExistingCourse(course);
      }
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


  newCourse(course?) {
    return this.fb.group({
      course: [course ? course : '', Validators.required]
    });
  }

  addExistingCourse(course) {
    this.courses.push(this.newCourse(course));
  }

  addCourse() {
      this.courses.push(this.newCourse());
  }

  deleteCourse(i) {
    ((this.form.controls.courses as FormArray)).controls.splice(i, 1);
  }

  updateUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastr.error('There are errors on the form', 'Form Invalid');
      return;
    } else {
      this.loader.start();
      const user = {
        id: this.form.controls.id.value,
        name: this.form.controls.name.value,
        username: this.form.controls.username.value,
        role: this.form.controls.role.value,
        apiKey: this.form.controls.apiKey.value,
        batchNumber: this.form.controls.batchNumber.value,
        branch: this.form.controls.branch.value,
        province: this.form.controls.province.value,
        region: this.form.controls.region.value,
        expiration: this.form.controls.expiration.value,
        courses: [],
      };
      for (const course of this.courses.controls) {
        user.courses.push({desc: course.value.course, value: this.trim(course.value.course).toLowerCase()});
      }
      this.userService.updateUser(user).subscribe((data) => {
        this.loader.stop();
        this.toastr.success('Successfully updated user', 'Success!');
        this.router.navigate(['/home/users/list']);
    });

    }

  }

  trim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
  }

  back() {
    this.router.navigate(['/home/users/list']);
  }
}
