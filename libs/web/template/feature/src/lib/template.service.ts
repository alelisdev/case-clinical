
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Template, UserCreateTemplateInput, UserUpdateTemplateInput } from "@case-clinical/shared/util/sdk";
import { TemplateBusinessProviderService } from "./business/template.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({
  providedIn: 'root',
})
export class TemplateService extends ServiceBase {
 constructor(
  @Inject(TemplateBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: TemplateBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("TemplateService", loggingService, serviceContext);
 }

    createTemplate(input: UserCreateTemplateInput): Observable<Template> {
        return this.businessProvider.createTemplate(input);
    }

    updateTemplate(input: UserUpdateTemplateInput, templateId: string): Observable<Template> {
        return this.businessProvider.updateTemplate(input, templateId);
    }

    importTemplates(templates: UserUpdateTemplateInput[]): Observable<boolean> {
        return this.businessProvider.importTemplates(templates);
    }
}

