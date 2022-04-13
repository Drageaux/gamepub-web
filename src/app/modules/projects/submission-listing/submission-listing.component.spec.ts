import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionListingComponent } from './submission-listing.component';

describe('SubmissionListingComponent', () => {
  let component: SubmissionListingComponent;
  let fixture: ComponentFixture<SubmissionListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
