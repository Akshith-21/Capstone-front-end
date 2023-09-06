import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupComponent ],
      imports:[RouterTestingModule, FormsModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
