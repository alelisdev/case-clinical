
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { BodyPart, UserCreateBodyPartInput, UserUpdateBodyPartInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { BodyPartBusinessProviderService } from "./body-part.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class BodyPartService extends ServiceBase {
 constructor(
  @Inject(BodyPartBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: BodyPartBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("BodyPartService", loggingService, serviceContext);
 }

    createBodyPart(input: UserCreateBodyPartInput): Observable<BodyPart> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createBodyPart(filteredObj);
    }

    updateBodyPart(input: UserUpdateBodyPartInput, bodyPartId: string): Observable<BodyPart> {
        return this.businessProvider.updateBodyPart(input, bodyPartId);
    }

    importBodyParts(bodyParts: UserUpdateBodyPartInput[]): Observable<UpdateResult> {
        return this.businessProvider.importBodyParts(bodyParts);
    }

    validateBodyPartExcelData(excelData: any[] ) {
      return this.businessProvider.validateBodyPartExcelData(excelData );
    }
}

