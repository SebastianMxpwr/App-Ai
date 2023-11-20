import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateImagesPage } from './create-images.page';

describe('CreateImagesPage', () => {
  let component: CreateImagesPage;
  let fixture: ComponentFixture<CreateImagesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
