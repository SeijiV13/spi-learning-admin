import { EncryptionService } from './../../../../core/services/encryption.service';
import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  errorMessage = '';
  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private ngxService: NgxUiLoaderService,
              private encryptionService: EncryptionService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.animateForm();
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  animateForm() {
    let current = null;
    document.querySelector('#email').addEventListener('focus', (e) => {
      if (current) { current.pause(); }
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: 0,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    });
    document.querySelector('#password').addEventListener('focus', (e) => {
      if (current) { current.pause(); }
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: -336,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    });
    document.querySelector('#submit').addEventListener('focus', (e) => {
      if (current) { current.pause(); }
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: -730,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '530 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    });

  }

  login() {
    if (this.form.valid) {
      const user = this.form.getRawValue();
      this.ngxService.start();
      this.authService.login(user).subscribe((data) => {
        localStorage.setItem('token', data.jwt);
        localStorage.setItem('userk', 'jx4D84uVVNyhITBwUM0ITWNFLp3yPMSMqmJjNhjNX4lTGWpamYzrgRM3XBjjTTzt');
        localStorage.setItem('idus', data.idus);
        localStorage.setItem('name', data.name);
        localStorage.setItem('role', this.encryptionService.convertText('encrypt', data.role));
        this.router.navigate(['/home/users/list']);
        this.ngxService.stop();
      },
      error => {
        this.ngxService.stop();
        if (error.error) {

          this.toastr.error(error.error.message, 'Server Errror');
        } else {
          this.toastr.error('Something went wrong please contact server administrator', 'Server Errror');
        }
      });
    } else {
       this.errorMessage = 'Username and Password field is required';
    }

    //  this.router.navigate(['/home/courses']);
  }


}
