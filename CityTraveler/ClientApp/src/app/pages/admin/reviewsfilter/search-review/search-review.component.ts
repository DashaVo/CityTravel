import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IFilterAdminReviews } from 'src/app/models/filters/filterReviews.admin';

@Component({
  selector: 'search-review',
  templateUrl: './search-review.component.html',
  styleUrls: ['./search-review.component.scss']
})
export class SearchReviewComponent implements OnInit {

  @Output() filterReview: EventEmitter<IFilterAdminReviews> = new EventEmitter<IFilterAdminReviews>();
  public reviewSearchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.reviewSearchForm = this.formBuilder.group({
      title: ['', [ Validators.maxLength(20)]],
      user: ['', [ Validators.maxLength(30)]],
      description:['',[, Validators.maxLength(70)]],
      ratingMore:[0],
      ratingLess:[5],

    });
  }
  get titleFormControl(): FormControl {
    return this.reviewSearchForm.get('title') as FormControl;
  }
  get userFormControl(): FormControl {
    return this.reviewSearchForm.get('user') as FormControl;
  }
  get descriptionFormControl(): FormControl {
    return this.reviewSearchForm.get('description') as FormControl;
  }
  get ratingMoreMoreFormControl(): FormControl {
    return this.reviewSearchForm.get('ratingMore') as FormControl;
  }
  get ratingLessFormControl(): FormControl {
    return this.reviewSearchForm.get('ratingLess') as FormControl;
  }
  submit(){

    this.filterReview.emit({
      user: this.userFormControl.value,
      title: this.titleFormControl.value,
      description: this.descriptionFormControl.value,
      ratingLess: this.ratingLessFormControl.value,
      ratingMore: this.ratingMoreMoreFormControl.value
    });
  }

}
