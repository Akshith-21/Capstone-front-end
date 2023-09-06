import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportComponent } from './report.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  @Component({
    selector: 'app-nav',
    template: 'mock nav'
    })
    class MockNavComponent {
     @Input()
     email:string=''
    }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportComponent, MockNavComponent ],
      imports:[RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
