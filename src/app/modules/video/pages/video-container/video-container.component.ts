import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VideoService } from './../../../../core/services/video/video.service';
import { Component, OnInit } from '@angular/core';
import { ShareVideoComponent } from 'src/app/core/components/modals/share-video/share-video.component';

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.css']
})
export class VideoContainerComponent implements OnInit {
  videos: any = [];
  link = "";
  constructor(private videoService: VideoService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getVideos();
  }

  getVideos() {
    this.videoService.getVideos().subscribe((data: any) => {
      this.videos = data.rows;
      console.log(data);
    });
  }

  setLink(id) {
    this.videoService.generateShareKey().subscribe((data: any) => {
      console.log(data);
      this.modalService.open(ShareVideoComponent);
      this.link = `https://spi-app.herokuapp.com/share/${id}?id=${data.jwt}`;
      this.videoService.linkSubject.next(this.link);
    });

  }

}
