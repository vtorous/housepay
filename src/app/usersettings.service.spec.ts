import { TestBed, inject } from '@angular/core/testing';

import { UsersettingsService } from './usersettings.service';

describe('UsersettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersettingsService]
    });
  });

  it('should be created', inject([UsersettingsService], (service: UsersettingsService) => {
    expect(service).toBeTruthy();
  }));
});
