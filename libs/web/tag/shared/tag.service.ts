
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Tag, UserCreateTagInput, UserUpdateTagInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { TagBusinessProviderService } from "./tag.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class TagService extends ServiceBase {
 constructor(
  @Inject(TagBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: TagBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("TagService", loggingService, serviceContext);
 }

    createTag(input: UserCreateTagInput): Observable<Tag> {
        return this.businessProvider.createTag(input);
    }

    updateTag(input: UserUpdateTagInput, tagId: string): Observable<Tag> {
        return this.businessProvider.updateTag(input, tagId);
    }

    importTags(tags: UserUpdateTagInput[]): Observable<UpdateResult> {
        return this.businessProvider.importTags(tags);
    }

    validateTagExcelData(excelData: any[] ) {
      return this.businessProvider.validateTagExcelData(excelData );
    }
}

