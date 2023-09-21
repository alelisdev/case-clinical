
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Category, UserCreateCategoryInput, UserUpdateCategoryInput } from "@case-clinical/shared/util/sdk";
import { CategoryBusinessProviderService } from "./business/category.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
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
        return this.businessProvider.createCategory(input);
    }

    updateCategory(input: UserUpdateCategoryInput, categoryId: string): Observable<Category> {
        return this.businessProvider.updateCategory(input, categoryId);
    }

    importCategories(categories: UserUpdateCategoryInput[]): Observable<boolean> {
        return this.businessProvider.importCategories(categories);
    }
}

