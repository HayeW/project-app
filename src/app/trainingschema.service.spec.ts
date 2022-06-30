import { TestBed } from '@angular/core/testing';

import { TrainingschemaService } from './trainingschema.service';

describe('TrainingschemaService', () => {
  let service: TrainingschemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingschemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
