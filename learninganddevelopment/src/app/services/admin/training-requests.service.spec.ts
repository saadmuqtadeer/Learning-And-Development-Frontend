import { TestBed } from '@angular/core/testing';

import { TrainingRequestsService } from './training-requests.service';

describe('TrainingRequestsService', () => {
  let service: TrainingRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
