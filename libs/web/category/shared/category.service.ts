
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Category, UserCreateCategoryInput, UserUpdateCategoryInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { CategoryBusinessProviderService } from "./category.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class CategoryService extends ServiceBase {
 constructor(
  @Inject(CategoryBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: CategoryBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("CategoryService", loggingService, serviceContext);
 }

    createCategory(input: UserCreateCategoryInput): Observable<Category> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createCategory(filteredObj);
    }

    updateCategory(input: UserUpdateCategoryInput, categoryId: string): Observable<Category> {
        return this.businessProvider.updateCategory(input, categoryId);
    }

    importCategories(categories: UserUpdateCategoryInput[]): Observable<UpdateResult> {
        return this.businessProvider.importCategories(categories);
    }

    validateCategoryExcelData(excelData: any[] ) {
      return this.businessProvider.validateCategoryExcelData(excelData );
    }
}

