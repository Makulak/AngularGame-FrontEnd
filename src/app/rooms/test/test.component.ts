import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private rooms: RoomsService) { }

  ngOnInit(): void {
    this.rooms.setConnection();
    this.rooms.startConnection();
  }

}
