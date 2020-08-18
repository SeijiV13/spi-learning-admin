/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UcService } from './uc.service';

describe('Service: Uc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UcService]
    });
  });

  it('should ...', inject([UcService], (service: UcService) => {
    expect(service).toBeTruthy();
  }));
});
