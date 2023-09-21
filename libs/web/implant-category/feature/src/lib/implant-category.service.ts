
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ImplantCategory, UserCreateImplantCategoryInput, UserUpdateImplantCategoryInput } from "@case-clinical/shared/util/sdk";
import { ImplantCategoryBusinessProviderService } from "./business/implant-category.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class ImplantCategoryService extends ServiceBase {
 constructor(
  @Inject(ImplantCategoryBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ImplantCategoryBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ImplantCategoryService", loggingService, serviceContext);
 }

    createImplantCategory(input: UserCreateImplantCategoryInput): Observable<ImplantCategory> {
        return this.businessProvider.createImplantCategory(input);
    }

    updateImplantCategory(input: UserUpdateImplantCategoryInput, implantCategoryId: string): Observable<ImplantCategory> {
        return this.businessProvider.updateImplantCategory(input, implantCategoryId);
    }

    importImplantCategories(implantCategories: UserUpdateImplantCategoryInput[]): Observable<boolean> {
        return this.businessProvider.importImplantCategories(implantCategories);
    }
}

