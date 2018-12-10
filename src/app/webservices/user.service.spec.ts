import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpModule } from '@angular/http';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';




describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports : [HttpModule, AngularFireAuth, AngularFirestore]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
