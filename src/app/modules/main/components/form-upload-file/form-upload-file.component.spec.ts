import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUploadFileComponent } from './form-upload-file.component';

describe('FormUploadFileComponent', () => {
  let component: FormUploadFileComponent;
  let fixture: ComponentFixture<FormUploadFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormUploadFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
