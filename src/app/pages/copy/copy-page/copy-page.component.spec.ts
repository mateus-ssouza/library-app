import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyPageComponent } from './copy-page.component';

describe('CopyPageComponent', () => {
  let component: CopyPageComponent;
  let fixture: ComponentFixture<CopyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
