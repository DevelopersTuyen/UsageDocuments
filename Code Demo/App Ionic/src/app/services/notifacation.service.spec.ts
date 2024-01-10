import { TestBed } from '@angular/core/testing';

import { NotifacationService } from './notifacation.service';

describe('NotifacationService', () => {
  let service: NotifacationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifacationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
