import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeHistoryComponent } from './trade-history.component';
import { ActivatedRoute } from '@angular/router';

describe('TradeHistoryComponent', () => {
  let component: TradeHistoryComponent;
  let fixture: ComponentFixture<TradeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeHistoryComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
