
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() showMenu = true;
  @Output() toggleSidebar = new EventEmitter();
  user = '';
  constructor(private router: Router) { }

  ngOnInit() {
    this.user = localStorage.getItem('name');
    this.listenToRouter();
  }
  toggle() {
    this.toggleSidebar.emit();
 }

 logoutApp() {
   this.router.navigate(['/']);
 }


 listenToRouter() {
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      if (event.url === '/home/lessons') {

     }
    }
  });
}


}
