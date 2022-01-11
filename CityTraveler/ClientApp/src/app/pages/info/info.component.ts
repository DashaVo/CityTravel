import { Component } from '@angular/core';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  title = 'info';
  public slides = [
    {
      srcImage: 'https://picsum.photos/id/1039/6945/4635',
      title: 'The most popular trip',
      description: 'Our users like this trip'
    }, {
      srcImage: 'https://images.unsplash.com/photo-1449452198679-05c7fd30f416?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      title: 'The most popular entertainment',
      description: 'You can choose this entertainment'
    }, {
      srcImage: 'https://images.unsplash.com/photo-1449452331500-12267f185002?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      title: '',
      description: ''
    }
  ];
  public hidden =true;
  public currentActiveSlide = 0;

  changeSlideNext() {
    this.currentActiveSlide = this.currentActiveSlide === this.slides.length - 1 ? 0 : this.currentActiveSlide + 1;
  }
  changeSlidePrev() {
    this.currentActiveSlide = this.currentActiveSlide === 0 ? 0 : this.currentActiveSlide - 1;
  }
}
