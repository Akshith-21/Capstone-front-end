import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPreferencesComponent } from './client-preference.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

describe('ClientPreferenceComponent', () => {
  let component: ClientPreferencesComponent;
  let fixture: ComponentFixture<ClientPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPreferencesComponent ],
      imports:[RouterTestingModule,SharedModule,CardModule,DropdownModule,CommonModule,ButtonModule]
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
