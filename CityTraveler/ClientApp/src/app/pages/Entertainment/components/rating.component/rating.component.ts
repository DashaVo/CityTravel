import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent implements OnInit {

  constructor () {}

  public config = {
    isSmall: false,
    maxRating: 5,
    ratingValue: 0,
    stars: [],
    rates: [],
  }

  @Input() public ratingValue: number;
  @Input() public isSmall: boolean;

  @Output() passingRetingEmitter: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
    this.config.ratingValue = this.ratingValue;
    this.config.isSmall = this.isSmall;
    this.config.rates = Array.from({length: this.config.maxRating}, (x, y)=> y + 0.5);
  }

  emitOutput(ratingValue: number) {
    this.passingRetingEmitter.emit(ratingValue);
  }
}
