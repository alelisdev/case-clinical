
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Template, UserCreateTemplateInput, UserUpdateTemplateInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { TemplateBusinessProviderService } from "./template.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class TemplateService extends ServiceBase {
 constructor(
  @Inject(TemplateBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: TemplateBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("templateService", loggingService, serviceContext);
 }

    createTemplate(input: UserCreateTemplateInput): Observable<Template> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createTemplate(filteredObj);
    }

    updateTemplate(input: UserUpdateTemplateInput, templateId: string): Observable<Template> {
        return this.businessProvider.updateTemplate(input, templateId);
    }

    importTemplates(templates: UserUpdateTemplateInput[]): Observable<UpdateResult> {
        return this.businessProvider.importTemplates(templates);
    }

    validateTemplateExcelData(excelData: any[] ) {
    //   return this.businessProvider.validateTemplateExcelData(excelData );
    }
}

