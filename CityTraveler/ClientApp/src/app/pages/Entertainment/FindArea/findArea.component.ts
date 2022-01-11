import { Component, OnInit } from '@angular/core';
import { IEntertainmentPreview } from 'src/app/models/entertainment.preview.model';
import { EntertainmentService } from 'src/app/services/entertainmentService';

@Component({
  selector: 'find-area',
  templateUrl: './findArea.component.html',
  styleUrls: ['./findArea.component.scss']
})
export class FindArea implements OnInit{

  constructor(private service: EntertainmentService) { }

  public types: string[];
  public type: number;
  public response = [];
  public isLoading = false;

  ngOnInit() {
    this.service.getTypes()
    .then((res: string[]) => this.types = res);
  }

  getAll() {
    this.isLoading = true;
    this.response = [];
    this.service.getAllEntertainment(this.type)
    .then((res: Array<IEntertainmentPreview>) => {
      this.response = res;
      this.isLoading = false;
    });
  }
}
