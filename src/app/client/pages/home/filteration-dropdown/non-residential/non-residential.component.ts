import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-non-residential',
  templateUrl: './non-residential.component.html',
  styleUrls: ['./non-residential.component.scss'],
})
export class NonResidentialComponent implements OnInit {
  @Output() value = new EventEmitter();
  @Output() closeDropdown = new EventEmitter();

  nonResidentialValue: string | null;

  constructor() {}

  ngOnInit(): void {}

  clickValue(value: string): void {
    this.nonResidentialValue = value;

    this.value.emit(value);

    setTimeout(() => {
      this.closeDropdown.emit();
    }, 1000);
  }
}
