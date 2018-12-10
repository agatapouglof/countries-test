import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports : [AngularFirestore, AngularFireAuth]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
