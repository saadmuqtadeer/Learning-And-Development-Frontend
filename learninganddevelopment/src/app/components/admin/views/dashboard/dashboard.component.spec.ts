import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:learninganddevelopment/src/app/components/authentication/Unauth/unauthorized/unauthorized.component.spec.ts
import { UnauthorizedComponent } from './unauthorized.component';

describe('UnauthorizedComponent', () => {
  let component: UnauthorizedComponent;
  let fixture: ComponentFixture<UnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnauthorizedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthorizedComponent);
========
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
>>>>>>>> 400d04e092bcdba212f1c1c6f4bfeeec96051b0e:learninganddevelopment/src/app/components/admin/views/dashboard/dashboard.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
