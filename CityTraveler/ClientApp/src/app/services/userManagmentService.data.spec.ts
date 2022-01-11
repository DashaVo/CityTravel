import {} from 'jasmine';
import { getTestBed, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { UserManagementDataService } from './userManagementService.data';
import { IUserProfile } from '../models/user.model';
import { defer } from 'rxjs/internal/observable/defer';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

describe('UserManagmentService data using spy', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let userManagmentService: UserManagementDataService;
  const skip = 0;
  const take = 1;
  const expectedUsers: IUserProfile[] =
      [{ Id: '1',
        name: 'A',
        username: 'a',
        avatarSrc: 'string',
        phoneNumber: '',
        email: 'a@a.a',
        gender: 'male',
        accessToken: 'string',
        birthday: '',
        role: 'Admin'},
        ];
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    userManagmentService = new UserManagementDataService(httpClientSpy);
  });

  it('should exist', () => {
    expect(userManagmentService).toBeDefined();
  });

  it('should return expected users (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(asyncData(expectedUsers));
    userManagmentService.getUsersRange(skip, take).subscribe(
      users => {
        expect(users).toEqual(expectedUsers, 'expected users');
        done();
      },
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    userManagmentService.getUsersRange(skip,take).subscribe(
      users => done.fail('expected an error, not users'),
      error  => {
        expect(error.message).toContain('test 404 error');
        done();
      }
    );
  });
  function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
  }
  function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
  }

});





