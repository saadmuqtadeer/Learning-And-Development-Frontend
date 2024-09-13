import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsFeedbackComponent } from './accounts-feedback.component';

describe('AccountsFeedbackComponent', () => {
  let component: AccountsFeedbackComponent;
  let fixture: ComponentFixture<AccountsFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountsFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
