import { UserManagementDataService } from './userManagementService.data';
import { UserManagementService } from "./userManagementService";
import { TestBed } from "@angular/core/testing";

describe ('UserManagementService', () => {
  let service: UserManagementService;
  let dependency: UserManagementDataService;
  let fakeDependencyService = jasmine.createSpyObj(["deleteUser"]);


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserManagementService,
      {provide: UserManagementDataService, useValue: fakeDependencyService}]
    });
    service = TestBed.get(UserManagementService);
  })

  it('should create', () => {
    expect(service).toBeDefined();
  });
  it(' method deleteUser should calls dependency method', () => {
    const userId = '123'
    service.deleteUser(userId);
    expect(fakeDependencyService.deleteUser).toHaveBeenCalled();
    //expect(fakeDependencyService.deleteuser).toHaveBeenCalledWith(userId);
  });

})
