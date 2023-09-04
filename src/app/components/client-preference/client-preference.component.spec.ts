import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPreferencesComponent } from './client-preference.component';

describe('ClientPreferenceComponent', () => {
  let component: ClientPreferencesComponent;
  let fixture: ComponentFixture<ClientPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPreferencesComponent ]
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
