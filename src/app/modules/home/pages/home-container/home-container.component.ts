import { EncryptionService } from './../../../../core/services/encryption.service';

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
  role = '';

  constructor(private router: Router, private cd: ChangeDetectorRef,
              private encryptionService: EncryptionService) { }

  ngOnInit() {
    this.checkRoute();
    this.getDecryptedRole();
  }

  getDecryptedRole() {
    this.role = this.encryptionService.convertText('decrypt', localStorage.getItem('role'));
  }

  checkRoute() {
    if (this.router.url.includes('courses')) {
      this.activeRoute = 'course';
    } else if (this.router.url.includes('users')) {
      this.activeRoute = 'user';
    } else {
      this.activeRoute = 'video';
    }
  }

  redirect(route) {
    if (route === 'courses') {
      this.activeRoute = 'course';
      this.router.navigate([`/home/courses/list`]);
    } else if (route === 'users') {
      this.activeRoute = 'user';
      this.router.navigate([`/home/users/list`]);
    } else if (route === 'videos') {
      this.activeRoute = 'video';
      this.router.navigate([`/home/videos`]);
    } else if (route === 'reports') {
      this.activeRoute = 'reports';
      this.router.navigate([`/home/reports/list`]);
    }
  }

  toggleSidebar() {
    this.opened = !this.opened;
  }


}
