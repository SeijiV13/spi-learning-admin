import { UserService } from './../../../../core/services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: [];
  constructor(private router: Router,
              private userService: UserService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getUsers();
  }

  addUser() {
    this.router.navigate(['/home/users/add']);
  }

  getUsers() {
     this.userService.getUsers().subscribe((data) => {
       this.users = data;
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

}
