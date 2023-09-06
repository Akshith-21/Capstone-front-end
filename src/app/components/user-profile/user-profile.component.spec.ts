import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Price } from 'src/app/models/price.model';
import { MatIconModule } from '@angular/material/icon';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let price :Price[]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      imports:[MatIconModule],
      providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: price }]

    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
