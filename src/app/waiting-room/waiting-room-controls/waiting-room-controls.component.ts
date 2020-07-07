import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';

import { WaitingRoomService } from '../waiting-room.service';
import { FormHelperService } from 'src/app/shared/form-helper.service';

@Component({
  selector: 'app-waiting-room-controls',
  templateUrl: './waiting-room-controls.component.html',
  styleUrls: ['./waiting-room-controls.component.scss']
})
export class WaitingRoomControlsComponent implements OnInit {

  createRoomForm: FormGroup;
  get form() {
    return this.createRoomForm.controls;
  }

  roomName: string;
  roomPassword: string;

  constructor(private waitingRoomService: WaitingRoomService,
              private formHelper: FormHelperService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createRoomForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      password: new FormControl(''),
    });
  }

  onCreateRoom() {
    if (this.createRoomForm.invalid) {
      return;
    }
    this.waitingRoomService.createRoom(this.form.name.value, this.form.password.value);
  }

  // onRemoveRoom(id: string) {
  //   this.waitingRoomService.removeRoom(id);
  // }

  getErrorMessage(control: AbstractControl): string {
    return this.formHelper.getErrorMessage(control);
  }
}
