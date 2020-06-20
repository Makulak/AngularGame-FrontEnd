import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';

import { FormHelperService } from 'src/app/shared/form-helper.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss',
              '../user.module.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  get form() {
    return this.loginForm.controls;
  }

  submitted: boolean;
  loading: boolean;

  constructor(private formBuilder: FormBuilder,
              private formHelper: FormHelperService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    });
  }

  onSignIn() {
    this.authService.login(this.form.username.value, this.form.password.value, this.form.rememberMe.value)
    .subscribe({
      next: () => {
        this.router.navigate(['']);
      }
    });
  }

  getErrorMessage(control: AbstractControl): string {
    return this.formHelper.getErrorMessage(control);
  }
}
