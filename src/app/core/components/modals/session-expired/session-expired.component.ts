import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.css']
})
export class SessionExpiredComponent implements OnInit {

  constructor( public activeModal: NgbActiveModal, private router: Router) {
  }

  ngOnInit() {
  }

  backToLogin() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('idus');
    localStorage.removeItem('userk');
    this.router.navigate(['/']);
  }

}
