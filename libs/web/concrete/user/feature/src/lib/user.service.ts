
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { User, UserCreateUserInput, UserUpdateUserInput } from "@case-clinical/shared/util/sdk";
import { UserBusinessProviderService } from "./business/user.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class UserService extends ServiceBase {
 constructor(
  @Inject(UserBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: UserBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("UserService", loggingService, serviceContext);
 }

    createUser(input: UserCreateUserInput): Observable<User> {
        return this.businessProvider.createUser(input);
    }

    updateUser(input: UserUpdateUserInput, userId: string): Observable<User> {
        return this.businessProvider.updateUser(input, userId);
    }

    importUsers(users: UserUpdateUserInput[]): Observable<boolean> {
        return this.businessProvider.importUsers(users);
    }
}

