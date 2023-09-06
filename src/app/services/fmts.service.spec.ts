import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { FmtsService } from './fmts.service';
import { Price } from '../models/price.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('FmtsService', () => {
  let service: FmtsService;
  let httpTestingController: HttpTestingController;

  let fmtsMockData : Price [] =[]

  beforeEach(() => {
    fmtsMockData =[
      {
        "askPrice": 104.75,
        "bidPrice": 104.25,
        "priceTimestamp": "21-AUG-19 10.00.01.042000000 AM GMT",
        "instrument": {
        "instrumentId": "N123456",
        "externalIdType": "CUSIP",
        "externalId": "46625H100",
        "categoryId": "STOCK",
        "instrumentDescription": "JPMorgan Chase & Co. Capital Stock",
        "maxQuantity": 1000,
        "minQuantity": 1
        }
        },
        {
        "askPrice": 312500,
        "bidPrice": 312000,
        "priceTimestamp": "21-AUG-19 05.00.00.040000000 AM -05:00",
        "instrument": {
        "instrumentId": "N123789",
        "externalIdType": "ISIN",
        "externalId": "US0846707026",
        "categoryId": "STOCK",
        "instrumentDescription": "Berkshire Hathaway Inc. Class A",
        "maxQuantity": 10,
        "minQuantity": 1
        }
        }
    ];

    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(FmtsService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should return fmts Price Data", inject(
    [FmtsService],
    fakeAsync((service: FmtsService) => {
      let price: Price[] = [];
      service.getAllPrices().subscribe((data) => (price = data));
      const req = httpTestingController.expectOne(service.fmtsUrl+"/prices");
      // Assert that the request is a GET.
      expect(req.request.method).toEqual("GET");
      // Respond with mock data, causing Observable to resolve.
      req.flush(fmtsMockData);
      // Cause all Observables to complete and check the results
      tick();
      expect(price[0].askPrice).toBe(104.75);
})
  ));
  // it("should handle network error", inject(
  //   [FmtsService],
  //   fakeAsync((service: FmtsService) => {
  //     let errorMessage: string = "";
  //     const errorHandlerSpy = spyOn(service, "handleError").and.callThrough();

  //     service.getAllPrices().subscribe({
  //       next: () => fail("Should not succeed"),
  //       error: (e) => (errorMessage = e),
  //     });

  //     const req = httpTestingController.expectOne(service.fmtsUrl);
  //     expect(req.request.method).toEqual("GET");
  //     const mockError = new ProgressEvent("simulated network error");
  //     req.error(mockError);
  //     tick();

  //     expect(errorMessage).toBe(
  //       "Unable to contact service; please try again later."
  //     );
  //     expect(errorHandlerSpy).toHaveBeenCalled();
  //     let httpErrorResp: HttpErrorResponse =
  //       errorHandlerSpy.calls.argsFor(0)[0];
  //     expect(httpErrorResp.error.type).toBe("simulated network error");
  //   })
  // ));
})
  
