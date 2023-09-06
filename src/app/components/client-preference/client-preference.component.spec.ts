import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPreferencesComponent } from './client-preference.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClientPreferenceComponent', () => {
  let component: ClientPreferencesComponent;
  let fixture: ComponentFixture<ClientPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPreferencesComponent ],
      imports:[RouterTestingModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ClientPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
