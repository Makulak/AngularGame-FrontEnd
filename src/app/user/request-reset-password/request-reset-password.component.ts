import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { FormHelperService } from 'src/app/shared/form-helper.service';
import { AlertService } from 'src/app/shared/alert.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.scss',
              '../user.module.scss']
})
export class RequestResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  get form() {
    return this.resetPasswordForm.controls;
  }

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              private formHelper: FormHelperService,
              private alertService: AlertService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onResetPassword() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.userService.requestResetPassword(this.form.email.value)
      .subscribe({
        next: () => {
          this.alertService.showSuccess(this.translate.instant('Info.ResetPasswordEmailSent'));
          this.router.navigate(['/']);
        }
      });
  }

  getErrorMessage(control: AbstractControl): string {
    return this.formHelper.getErrorMessage(control);
  }
}
