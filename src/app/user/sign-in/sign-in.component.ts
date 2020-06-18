import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { getErrorMessageFromControl } from 'src/app/shared/form-control.helper';

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

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSignIn() {

  }

  getErrorMessage(control: AbstractControl): string {
    return getErrorMessageFromControl(control);
  }
}
