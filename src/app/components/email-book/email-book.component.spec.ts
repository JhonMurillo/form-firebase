import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailBookComponent } from './email-book.component';

describe('EmailBookComponent', () => {
  let component: EmailBookComponent;
  let fixture: ComponentFixture<EmailBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
