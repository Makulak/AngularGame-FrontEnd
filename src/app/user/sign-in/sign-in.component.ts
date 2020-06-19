import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { FormHelperService } from 'src/app/shared/form-helper.service';

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
              private formHelper: FormHelperService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(false)
    });
  }

  onSignIn() {

  }

  getErrorMessage(control: AbstractControl): string {
    return this.formHelper.getErrorMessage(control);
  }
}
