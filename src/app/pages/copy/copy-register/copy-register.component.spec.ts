import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyRegisterComponent } from './copy-register.component';

describe('CopyRegisterComponent', () => {
  let component: CopyRegisterComponent;
  let fixture: ComponentFixture<CopyRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
