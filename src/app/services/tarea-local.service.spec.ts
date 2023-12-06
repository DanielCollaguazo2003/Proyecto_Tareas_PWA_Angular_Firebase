import { TestBed } from '@angular/core/testing';

import { TareaLocalService } from './tarea-local.service';

describe('TareaLocalService', () => {
  let service: TareaLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TareaLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
