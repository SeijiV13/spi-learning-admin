
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {
  opened = true;
  showMenu = false;
  activeRoute = 'user';

  constructor(private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.checkRoute();
  }

  checkRoute() {
    if(this.router.url.includes('courses')) {
      this.activeRoute = 'course';
    } else {
      this.activeRoute = 'user';
    }
  }

  redirect(route) {
    if (route === 'courses') {
      this.activeRoute = 'course';
      this.router.navigate([`/home/courses/list`]);
    } else {
      this.activeRoute = 'user';
      this.router.navigate([`/home/users/list`])
    }
  }


}
