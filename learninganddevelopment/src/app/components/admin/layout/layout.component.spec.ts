import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:learninganddevelopment/src/app/components/employee/emp-dashboard/emp-dashboard.component.spec.ts
import { EmpDashboardComponent } from './emp-dashboard.component';

describe('EmpDashboardComponent', () => {
  let component: EmpDashboardComponent;
  let fixture: ComponentFixture<EmpDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpDashboardComponent);
========
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
>>>>>>>> 400d04e092bcdba212f1c1c6f4bfeeec96051b0e:learninganddevelopment/src/app/components/admin/layout/layout.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
