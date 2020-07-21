import { VideoService } from './../../../../core/services/video/video.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.css']
})
export class VideoContainerComponent implements OnInit {
  videos: any = [];
  link = "";
  constructor(private videoService: VideoService) { }

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
    this.link =`https://spi-app.herokuapp.com/share/${id}`;
  }

}
