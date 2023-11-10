import { TestBed } from '@angular/core/testing';

import { SignUpService } from './sign-up.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserRegistration } from '../sign-up-form/interfaces/UserRegistration';
import { HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiPaths } from '../enums/enums';

describe('SignupService', () => {
  let service: SignUpService;
  let httpTestingController: HttpTestingController;
  const endpoint = `${environment.baseUrl}${ApiPaths.users}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignUpService],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SignUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('submitData', () => {
    it('should post data', (done) => {
      const payload: UserRegistration = {
        firstName: 'john',
        lastName: 'Doe',
        email: 'a@a.com',
        password: 'hellowowrld',
      };

      service.submitData(payload).subscribe((response) => {
        expect(response).toBe(expectedResponse);
        done();
      });

      const req = httpTestingController.expectOne(endpoint);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(payload);

      const expectedResponse = new HttpResponse({
        status: 200,
        statusText: 'OK',
        body: payload,
      });
      req.flush(expectedResponse);
    });
  });
});
