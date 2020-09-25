import { FormGroup, FormBuilder } from '@angular/forms';
import { UcService } from './../../../../core/services/uc.service';
import { CourseService } from './../../../../core/services/course.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoService } from './../../../../core/services/video/video.service';
import { Component, OnInit } from '@angular/core';
import { ShareVideoComponent } from 'src/app/core/components/modals/share-video/share-video.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.css']
})
export class VideoContainerComponent implements OnInit {
  page = 1;
  totalItems = 40;
  courseForm: FormGroup;
  description = '';
  videos: any = [];
  filteredVideos = [];
  addedVideos = [];
  selectedVideos = [];
  link = '';
  courses = [];
  uc = [];
  groupVideos = {};
  finalGroup = {};
  listStyle = {
    width: '100%', // width of the list defaults to 300,
    height: '250px', // height of the list defaults to 250,
    dropZoneHeight: '70px' // height of the dropzone indicator defaults to 50
    };

    // for form after save
    saveCourse = '';
    saveUc = '';
  constructor(private videoService: VideoService,
              private modalService: NgbModal,
              private courseService: CourseService,
              private ucService: UcService,
              private toastr: ToastrService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.getVideos(1);
    this.initCourseForm();
    this.getCourses();
  }

  initCourseForm() {
    this.courseForm = this.fb.group({
      course: [''],
      uc: ['1']
    });
  }

  pageChange(event) {
    this.page = event.page;
    this.getVideos(this.page);
  }


  getCourses() {
    this.courseService.getCourse().subscribe((data) => {
      this.courses = data;
      if (this.courses.length > 0) {
          this.courseForm.controls.course.setValue(this.courses[0].id);
          this.getInitialSelectedVideos(this.courses[0].videos);
          this.getInitialSelectedCourse(this.courses[0].numberOfUc);
          this.getDescription();
      }
    });
  }

  getCoursesOnAction() {
    this.courseService.getCourse().subscribe((data) => {
      this.courses = data;
      setTimeout(() => {
        this.courseForm.controls.course.setValue(this.saveCourse);
        this.courseForm.controls.uc.setValue(this.saveUc);
      }, 10);


      this.getSelectedVideos();
      this.getSelectedCourse();
    });
  }



  getInitialSelectedVideos(videos) {
    this.selectedVideos = videos.filter(data => data.uc ===  this.courseForm.controls.uc.value);
  }

  getInitialSelectedCourse(course) {
    this.uc = [];
    let i = 1;
    while (i <= course) {
       this.uc.push({uc: i});
       i++;
     }
  }

  getSelectedCourse() {
    this.uc = [];
    let i = 1;
    const id = this.courseForm.controls.course.value;
    const course = this.courses.find((data) => data.id === id);
    while (i <= course.numberOfUc) {
       this.uc.push({uc: i});
       i++;
     }
    this.courseForm.controls.uc.setValue('1');
    this.getDescription();
  }

  getSelectedVideos(num?: string) {
    const id = this.courseForm.controls.course.value;
    const course = this.courses.find((data) => data.id === id);
    this.selectedVideos = course.videos.filter(data => data.uc ===  (num ? num : this.courseForm.controls.uc.value));
    this.getDescription();
  }

  getDescription() {
    const id = this.courseForm.controls.course.value;
    const uc = this.courseForm.controls.uc.value;
    this.ucService.getUc(id, uc).subscribe((data: any) => {
      if (data) {
        this.description = data.description;
      } else {
        this.description = '';
      }
    });
  }

  getVideos(page) {
    this.videoService.getVideos(page).subscribe((data: any) => {
      this.videos = data.rows;
      this.totalItems = data.count;
      this.filteredVideos = data.rows;
      this.addedVideos = [];
    });
  }


  setLink(id) {
    this.videoService.generateShareKey().subscribe((data: any) => {
      this.modalService.open(ShareVideoComponent);
      this.link = `https://spiconnect.online/share/${id}?id=${data.jwt}`;
      this.videoService.linkSubject.next(this.link);
    });

  }
  addDescription() {
    const id = this.courseForm.controls.course.value;
    const ucNumber = this.courseForm.controls.uc.value;
    const uc = {
      name : id,
      description: this.description,
      ucNumber
    };
    this.ucService.updateUc(uc).subscribe((data) => {
      this.toastr.success('', 'Successfully updated description');
    });
  }

  toggleVideo(event, data) {
    if (event.target.checked) {
      this.addedVideos.push(data);
    } else {
      this.addedVideos = this.addedVideos.filter(data2 => data2.id !== data.id);
    }
  }

  addVideos() {
    const course = this.courseForm.controls.course.value;
    const uc = this.courseForm.controls.uc.value;
    this.courseService.addVideos(this.addedVideos, course, uc).subscribe(data => {
      this.getVideos(this.page);
      this.saveCourse = course;
      this.saveUc = uc;
      this.getCoursesOnAction();
      this.addedVideos = [];
      this.toastr.success('Successfully added videos', 'Success!');
    });
  }

  listSorted(data) {
    this.selectedVideos = data;
  }


  sortVideos() {
    const course = this.courseForm.controls.course.value;
    const uc = this.courseForm.controls.uc.value;
    this.courseService.sortVideos(this.selectedVideos, course, uc).subscribe(data => {
      this.getVideos(this.page);
      this.saveCourse = course;
      this.saveUc = uc;
      this.getCoursesOnAction();
      this.addedVideos = [];
      this.toastr.success('Successfully sorted videos', 'Success!');
    });
  }

  filterResults(event) {
    const value = event.target.value;
    if (value) {
      this.filteredVideos = this.videos.filter((data: any) =>
      data.title.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.filteredVideos = this.videos;
    }
  }

  deleteVideo(id) {
    const course = this.courseForm.controls.course.value;
    const uc = this.courseForm.controls.uc.value;
    this.courseService.deleteVideo(course, id).subscribe(data => {
      this.getVideos(this.page);
      this.saveCourse = course;
      this.saveUc = uc;
      this.getCoursesOnAction();
      this.addedVideos = [];
      this.toastr.success('Successfully deleted video', 'Success!');
    });
  }

}
