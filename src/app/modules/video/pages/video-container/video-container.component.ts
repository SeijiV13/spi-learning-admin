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
  videos: any = [];
  link = '';
  courses = [];
  groupVideos = {};
  finalGroup = {};
  constructor(private videoService: VideoService,
              private modalService: NgbModal,
              private courseService: CourseService,
              private ucService: UcService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getVideos();
  }

  getVideos() {
    this.videoService.getVideos().subscribe((data: any) => {
      this.videos = data.rows;
      this.getCourses();
    });
  }

  getCourses() {
    this.courseService.getCourse().subscribe((data: any) => {
      this.ucService.getAllUc().subscribe((data2: any) => {

        for (const course of data) {
          const group = course.name.replace(/\s/g, '').toLowerCase();
          course.group = group;
          this.groupVideos[group] = this.videos.filter((video) => video.tags[0].includes(group));
      }
        this.courses = data;

        for (const key of Object.keys(this.groupVideos)) {
        this.finalGroup[key] = {};
        let uc = '';
        for (const video of  this.groupVideos[key]) {
          //  uc = video.tags[0].charAt(video.tags[0].length - 6) +
          //  video.tags[0].charAt(video.tags[0].length - 5)  + video.tags[0].charAt(video.tags[0].length - 4);
          uc = 'uc' + video.tags[0].split('uc')[1].split('lo')[0];
          console.log(uc);
          if (!this.finalGroup[key][uc]) {
            this.finalGroup[key][uc] = {};
            this.finalGroup[key][uc].description = data2.find((data3) => data3.name === key + uc)
            ? data2.find((data3) => data3.name === key + uc).description : '';
           }
          if (this.finalGroup[key][uc].video) {
            this.finalGroup[key][uc].video.push(video);
           } else {
            this.finalGroup[key][uc].video = [video];
           }

         }
        if (this.finalGroup[key][uc]) {
          if (this.finalGroup[key][uc].video) {
            this.finalGroup[key][uc].video = this.finalGroup[key][uc].video.sort((a, b) =>
            parseInt(a.tags[0].charAt(a.tags[0].length - 1)) - parseInt(b.tags[0].charAt(b.tags[0].length - 1)));
          }

         }
      }
    });
  });
  }


  setLink(id) {
    this.videoService.generateShareKey().subscribe((data: any) => {
      this.modalService.open(ShareVideoComponent);
      this.link = `https://spi-app.herokuapp.com/share/${id}?id=${data.jwt}`;
      this.videoService.linkSubject.next(this.link);
    });

  }
  addDescription(group, id) {
    const el = document.getElementById(`textarea-${id}`) as any;
    const uc = {
      name : group,
      description: el.value
    };
    this.ucService.updateUc(uc).subscribe((data) => {
      this.toastr.success('', 'Successfully updated description');
    });
  }

}
