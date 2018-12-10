import { TestBed } from '@angular/core/testing';

import { CountriesService } from './countries.service';
import { HttpModule } from '@angular/http';


describe('CountriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports : [HttpModule]
  }));

  it('should be created', () => {
    const service: CountriesService = TestBed.get(CountriesService);
    expect(service).toBeTruthy();
  });
});
