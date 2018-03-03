import { TestBed, inject } from '@angular/core/testing';

import { EmailBookServiceService } from './email-book-service.service';

describe('EmailBookServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailBookServiceService]
    });
  });

  it('should be created', inject([EmailBookServiceService], (service: EmailBookServiceService) => {
    expect(service).toBeTruthy();
  }));
});
