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
  users: any[];
  filteredUser: any[] ;
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
       this.filteredUser = data;
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
        data.name.includes(value) ||
        data.username.includes(value) ||
        data.batchNumber.includes(value) ||
        data.region.includes(value) ||
        data.province.includes(value) ||
        data.branch.includes(value)
      );
    } else {
      this.filteredUser = this.users;
    }
  }

}
