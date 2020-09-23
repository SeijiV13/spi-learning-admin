import { CourseService } from './../../../../core/services/course.service';
import { VideoService } from './../../../../core/services/video/video.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { firebrick } from 'color-name';
@Component({
  selector: 'app-list-user-reports',
  templateUrl: './list-user-reports.component.html',
  styleUrls: ['./list-user-reports.component.css']
})
export class ListUserReportsComponent implements OnInit {
  users: any[];
  filteredUser: any[] ;
  videos: [];
  courses: [];
  constructor(private router: Router,
              private userService: UserService,
              private videoService: VideoService,
              private toastr: ToastrService,
              private courseService: CourseService) { }

  ngOnInit() {
    this.getUsers();
    this.getCourses();
  }

  getUsers() {
     this.userService.getUsers().subscribe((data) => {
       this.users = data;
       this.getVideos();
       this.filteredUser = data;
     });
  }

  getWatched() {
    for (const user of this.users) {
      user.watchedTitle = [];
      for (const vid of user.watched) {
        user.watchedTitle.push(this.videos.find((data: any) => data.id === vid));
      }
    }
  }

  getVideos() {
    this.videoService.getVideos().subscribe((data: any) => {
      this.videos = data.rows;
      this.getWatched();
    });
  }

  updateUser(id) {
    localStorage.setItem('idus', id);
    this.router.navigate(['/home/users/update']);
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe((data) => {
      this.toastr.success('Successfully deleted user', 'Success!');
      this.getUsers();
    });
  }

  filterResults(event) {
    const value = event.target.value;
    if (value) {
      this.filteredUser = this.users.filter((data: any) =>
        data.name.toLowerCase().includes(value.toLowerCase()) ||
        data.username.toLowerCase().includes(value.toLowerCase()) ||
        data.batchNumber.toLowerCase().includes(value.toLowerCase()) ||
        data.region.toLowerCase().includes(value.toLowerCase()) ||
        data.province.toLowerCase().includes(value.toLowerCase()) ||
        data.branch.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.filteredUser = this.users;
    }
  }

  getCourses() {
    this.courseService.getCourse().subscribe((data) => {
      this.courses = data;
    });
  }

  generateReport() {
    const doc = new jsPDF();
    doc.autoTable({ html: '#my-table' });

    // Or use javascript directly:
    doc.autoTable({
      head: [['Name', 'Batch Number', 'Total Videos', 'Watch Videos', 'Percent completed']],
      body: this.getUsersForPdf()
    });
    doc.output('dataurlnewwindow');
  }



 getUsersForPdf() {
    const users = [];
    for (const user of this.filteredUser) {
        users.push([{ content: user.name, styles: { fontStyle: 'bold' } },
        user.batchNumber,
        this.computeTotalVideo(user.courses) ? this.computeTotalVideo(user.courses) : 0,
        user.watched.length,
        this.getPercentage(this.computeTotalVideo(user.courses), user.watched.length) !== undefined ?
        this.getPercentage(this.computeTotalVideo(user.courses), user.watched.length) : 'Not yet logged in'
      ]);
        if (user.watchedTitle) {
        if(user.watchedTitle.length > 0) {
          users.push(   [{ content: 'Watched Videos', colSpan: 5, rowSpan: 1, styles: { halign: 'center', fontStyle: 'bold' } }]);
          for (const vid of user.watchedTitle) {
            if (vid) {
              users.push(   [{ content: vid.title, colSpan: 5, rowSpan: 1, styles: { halign: 'left' } }]);
            }
          }
        }
      }

    }
    return users;
  }

  getPercentage(total, watched) {
    return (( watched / total) * 100 ?  '%' + ( watched / total) * 100 : undefined);
  }

  computeTotalVideo(courses) {
    let total = 0;
    if(this.courses) {
      for(const course of courses) {
        const foundCourse: any = this.courses.find((data: any) => data.name === course.desc);
        if (foundCourse) {
          total = total + foundCourse.videos.length;
        }
      }
    }
    return total;
  }

}
