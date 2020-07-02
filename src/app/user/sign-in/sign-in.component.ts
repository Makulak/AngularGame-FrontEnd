import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { FormHelperService } from 'src/app/shared/form-helper.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss',
              '../user.module.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  get form() {
    return this.signInForm.controls;
  }

  constructor(private formBuilder: FormBuilder,
              private formHelper: FormHelperService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    });
  }

  onSignIn() {
    if (this.signInForm.invalid) {
      return;
    }

    this.authService.signIn(this.form.email.value, this.form.password.value, this.form.rememberMe.value)
    .subscribe({
      next: () => {
        this.router.navigate(['/waiting-room']);
      }
    });
  }

  getErrorMessage(control: AbstractControl): string {
    return this.formHelper.getErrorMessage(control);
  }
}
