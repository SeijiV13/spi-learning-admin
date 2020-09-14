/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EncryptionService } from './encryption.service';

describe('Service: Encryption', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncryptionService]
    });
  });

  it('should ...', inject([EncryptionService], (service: EncryptionService) => {
    expect(service).toBeTruthy();
  }));
});
