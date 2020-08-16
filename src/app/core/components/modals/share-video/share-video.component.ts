import { VideoService } from './../../../services/video/video.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-share-video',
  templateUrl: './share-video.component.html',
  styleUrls: ['./share-video.component.scss']
})
export class ShareVideoComponent implements OnInit {
  link = '';
  constructor( public activeModal: NgbActiveModal, private videoService: VideoService) { }

  ngOnInit() {
    this.getLink();
  }

  getLink() {
    this.videoService.linkSubject.subscribe((data) => {
      this.link = data;
    });
  }

}
