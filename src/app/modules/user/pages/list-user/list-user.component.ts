import { EncryptionService } from './../../../../core/services/encryption.service';
import { AdminService } from './../../../../core/services/admin.service';
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
  adminUsers: any[];
  filteredUser: any[] ;
  filteredAdminUser: any[];
  role = "";
  constructor(private router: Router,
              private userService: UserService,
              private adminService: AdminService,
              private encryptionService: EncryptionService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getUsers();
    this.getAdminUsers();
    this.getDecryptedRole();
  }

  addUser() {
    this.router.navigate(['/home/users/add']);
  }

  getDecryptedRole() {
    this.role = this.encryptionService.convertText('decrypt', localStorage.getItem('role'));
  }

  getAdminUsers() {
    this.adminService.getAdmins().subscribe((data) => {
      this.adminUsers = data;
      this.filteredAdminUser = data;
    });
  }

  getUsers() {
     this.userService.getUsers().subscribe((data) => {
       this.users = data;
       this.filteredUser = data;
     });
  }

  updateUser(id, role) {
    localStorage.setItem('idus', id);
    localStorage.setItem('idrole', role);
    this.router.navigate(['/home/users/update']);
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe((data) => {
      this.toastr.success('Successfully deleted user', 'Success!');
      this.getUsers();
    });
  }

  deleteAdminUser(id)  {
    this.adminService.deleteAdmin(id).subscribe((data) => {
      this.toastr.success('Successfully deleted user', 'Success!');
      this.getAdminUsers();
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

  filterAdminResults(event) {
    const value = event.target.value;
    if (value) {
      this.filteredAdminUser = this.adminUsers.filter((data: any) =>
        data.name.includes(value) ||
        data.username.includes(value)
      );
    } else {
      this.filteredAdminUser = this.adminUsers;
    }
  }

}
