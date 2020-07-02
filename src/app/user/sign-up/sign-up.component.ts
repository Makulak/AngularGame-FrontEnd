import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { FormHelperService } from 'src/app/shared/form-helper.service';
import { UserService } from '../user.service';
import { MustMatch } from 'src/app/shared/must-match.validator';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss',
              '../user.module.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  get form() {
    return this.signUpForm.controls;
  }

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private formHelper: FormHelperService,
              private alertService: AlertService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
    }, {
      validator: MustMatch('password', 'repeatPassword')
    });
  }

  onSignUp() {
    if (this.signUpForm.invalid) {
      return;
    }

    this.userService.signUp(this.form.email.value, this.form.username.value, this.form.password.value)
      .subscribe({
        next: () => {
          this.alertService.showSuccess(this.translate.instant('Info.AccountCreated'));
          this.router.navigate(['/sign-in']);
        }
      });
  }

  getErrorMessage(control: AbstractControl): string {
    return this.formHelper.getErrorMessage(control);
  }
}
