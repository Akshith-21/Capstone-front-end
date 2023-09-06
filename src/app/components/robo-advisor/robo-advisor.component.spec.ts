import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoboAdvisorComponent } from './robo-advisor.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RoboAdvisorComponent', () => {
  let component: RoboAdvisorComponent;
  let fixture: ComponentFixture<RoboAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoboAdvisorComponent ],
      imports:[RouterTestingModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(RoboAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
