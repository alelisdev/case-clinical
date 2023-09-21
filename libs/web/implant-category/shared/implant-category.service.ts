
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { ImplantCategory, UserCreateImplantCategoryInput, UserUpdateImplantCategoryInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { ImplantCategoryBusinessProviderService } from "./implant-category.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
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
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createImplantCategory(filteredObj);
    }

    updateImplantCategory(input: UserUpdateImplantCategoryInput, implantCategoryId: string): Observable<ImplantCategory> {
        return this.businessProvider.updateImplantCategory(input, implantCategoryId);
    }

    importImplantCategories(implantCategories: UserUpdateImplantCategoryInput[]): Observable<UpdateResult> {
        return this.businessProvider.importImplantCategories(implantCategories);
    }

    validateImplantCategoryExcelData(excelData: any[] ) {
      return this.businessProvider.validateImplantCategoryExcelData(excelData );
    }
}

