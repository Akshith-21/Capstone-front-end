import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencePageComponent } from './preference-page.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('PreferencePageComponent', () => {
  let component: PreferencePageComponent;
  let fixture: ComponentFixture<PreferencePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferencePageComponent ],
      imports:[FormsModule, RouterTestingModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
