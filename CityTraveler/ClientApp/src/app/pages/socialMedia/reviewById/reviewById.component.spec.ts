import { SocialMediaService } from './../../../services/socialMediaService';
import { ComponentFixture, getTestBed, TestBed } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ReviewByIdComponent } from './reviewById.component';
import { IReviewPreviewModel } from 'src/app/models/reviewPreview.model';


describe('Map component tests', () => {
    let injector: TestBed;
    let fixture: ComponentFixture<ReviewByIdComponent>;
    let component: ReviewByIdComponent;

    beforeEach(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

        TestBed.configureTestingModule({
            declarations: [ ReviewByIdComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
              { provide: SocialMediaService, useValue: SocialMediaServiceStub }
            ]
        });

        injector = getTestBed();
        fixture = injector.createComponent(ReviewByIdComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
    });

    it('Component should exist', () => {
      expect(component).toBeDefined();
    });

    it('init get review by user id', async () => {
       await component.init();
      expect(component.reviewToClass).toBeDefined();
    });

    it('add comment test', async()=>{
      await component.addComment();
      expect(component.comments.find(x => x.name === component.request.name) )
    })

});


const SocialMediaServiceStub = {
  getById(): Promise<IReviewPreviewModel[]> {
    return Promise.resolve([]);
  }
}
