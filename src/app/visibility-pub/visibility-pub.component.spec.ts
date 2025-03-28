import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityPubComponent } from './visibility-pub.component';

describe('VisibilityPubComponent', () => {
  let component: VisibilityPubComponent;
  let fixture: ComponentFixture<VisibilityPubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisibilityPubComponent]
    });
    fixture = TestBed.createComponent(VisibilityPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
