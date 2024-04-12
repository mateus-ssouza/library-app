import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyRegisterHomepageComponent } from './copy-register-homepage.component';

describe('CopyRegisterHomepageComponent', () => {
  let component: CopyRegisterHomepageComponent;
  let fixture: ComponentFixture<CopyRegisterHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyRegisterHomepageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyRegisterHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
