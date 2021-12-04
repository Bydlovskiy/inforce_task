import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  @Output() deleted = new EventEmitter();
  @Output() regected = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  delete(): void {
    this.deleted.emit('')
  }
  regect(): void {
    this.regected.emit('')
  }

}
