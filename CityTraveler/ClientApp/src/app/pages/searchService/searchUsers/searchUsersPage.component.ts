import { Component } from "@angular/core";
import { IFiltertUsers } from "src/app/models/filters/filterUsers";
import { IUserProfile } from "src/app/models/user.model";
import { SearchService } from "src/app/services/searchService";
import * as defaults from "../../../models/initialValues";

@Component({
    selector: 'search-users',
    templateUrl: './searchUsersPage.component.html',
    styleUrls: ['../searchStyles.component.scss']
  })

export class SearchUsersComponent {
    public users: IUserProfile[] = [];
    public isError: boolean;
    public props: IFiltertUsers =  defaults.props;

    constructor(private service: SearchService){}

    submitUsers(){
      this.service.getUsers(this.props).then((res: IUserProfile[]) => {
        this.users = res;
      }).catch(() => {
        this.isError = true;
      });
    }
}
