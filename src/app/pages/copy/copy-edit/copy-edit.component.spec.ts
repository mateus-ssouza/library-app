import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyEditComponent } from './copy-edit.component';

describe('CopyEditComponent', () => {
  let component: CopyEditComponent;
  let fixture: ComponentFixture<CopyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopyEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CopyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
