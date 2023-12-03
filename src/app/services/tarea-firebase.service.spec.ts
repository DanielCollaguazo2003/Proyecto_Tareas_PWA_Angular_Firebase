import { TestBed } from '@angular/core/testing';

import { TareaFirebaseService } from './tarea-firebase.service';

describe('TareaFirebaseService', () => {
  let service: TareaFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
