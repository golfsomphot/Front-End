import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleorderComponent } from './saleorder.component';

describe('SaleorderComponent', () => {
  let component: SaleorderComponent;
  let fixture: ComponentFixture<SaleorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleorderComponent]
    });
    fixture = TestBed.createComponent(SaleorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
