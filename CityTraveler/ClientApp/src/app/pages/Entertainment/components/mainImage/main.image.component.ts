import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'main-image',
  templateUrl: './main.image.component.html',
  styleUrls: ['./main.image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainImageComponent implements OnInit {

  constructor() {}

  public defaultImage = "https://atlas-content-cdn.pixelsquid.com/stock-images/mini-house-doll-WyXEB61-600.jpg"

  @Input() public isAdmin: boolean;
  @Input() public averageRating: number;
  @Input() public mainImage: {
    source: string,
    title: string
  };

  @Output() openAddReviewEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteEmitter: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {}

  emitOutput(ratingValue: number) {
    this.openAddReviewEmitter.emit(ratingValue);
  }

  openSubmitModal() {
    this.deleteEmitter.emit();
  }
}
