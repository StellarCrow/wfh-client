import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ILoginResponse} from '../../shared/interfaces/i-login-response';
import {apiUrl} from '../../../environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  describe('User login was successful', () => {
    const loginResponse = {
      success: true,
      payload: {
        userData: {
          firstName: 'Maxon',
          lastName: 'YourBoss',
          email: 'im_your_dream@gmail.com',
          password: 'some hashed password here is will be so long',
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjVlY2MxNjk1ZDg3NzRiMmZlNDk1NzcyZCIsImlhdCI6MTU5MD' +
          'Y3NDExNSwiZXhwIjoxNTkwNzYwNTE1fQ.frAP9u1CJ5YuW5ML3NqSZ8VnWv11-pix8wF1WY2oosI'
      },
      status: '200 OK'
    } as ILoginResponse;
    it('Login request should return user data', () => {
      authService.loginUser('im_your_dream@gmail.com', 'some hashed password here is will be so long')
        .subscribe(({payload}) => expect(Object.keys(payload.userData).length).toEqual(4));

      const req = httpTestingController.expectOne(`${apiUrl}/auth/login`);
      expect(req.request.method).toEqual('POST');
      req.flush(loginResponse);
    });
    it('Login request should return jwt token ', () => {
      authService.loginUser('im_your_dream@gmail.com', 'some hashed password here is will be so long')
        .subscribe(({payload}) => expect(payload.token).toBeTruthy());

      const req = httpTestingController.expectOne(`${apiUrl}/auth/login`);
      expect(req.request.method).toEqual('POST');
      req.flush(loginResponse);
    });
    it('Success login request should has a true success', () => {
      authService.loginUser('im_your_dream@gmail.com', 'some hashed password here is will be so long')
        .subscribe((data) => expect(data.success).toBeTrue());

      const req = httpTestingController.expectOne(`${apiUrl}/auth/login`);
      expect(req.request.method).toEqual('POST');
      req.flush(loginResponse);
    });
  });
  describe('User login was failed', () => {
    const loginResponse = {
      success: false,
      payload: null,
      error: {status: 400, message: '400 Bad Request'}
    } as ILoginResponse;

    it('Fail login should has a status false', () => {
      authService.loginUser('im_your_dream@gmail.com', 'some wrong password')
        .subscribe((data) => expect(data.success).toBeFalse());

      const req = httpTestingController.expectOne(`${apiUrl}/auth/login`);
      expect(req.request.method).toEqual('POST');
      req.flush(loginResponse);
    });
    it('Fail login payload should be null', () => {
      authService.loginUser('im_your_dream@gmail.com', 'some wrong password')
        .subscribe((data) => expect(data.payload).toBeNull());

      const req = httpTestingController.expectOne(`${apiUrl}/auth/login`);
      expect(req.request.method).toEqual('POST');
      req.flush(loginResponse);
    });
  });
});
