
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Language, UserCreateLanguageInput, UserUpdateLanguageInput, UpdateResult,  } from "@case-clinical/shared/util/sdk";
import { LanguageBusinessProviderService } from "./language.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class LanguageService extends ServiceBase {
 constructor(
  @Inject(LanguageBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: LanguageBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("LanguageService", loggingService, serviceContext);
 }

    createLanguage(input: UserCreateLanguageInput): Observable<Language> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createLanguage(filteredObj);
    }

    updateLanguage(input: UserUpdateLanguageInput, languageId: string): Observable<Language> {
        return this.businessProvider.updateLanguage(input, languageId);
    }

    importLanguages(languages: UserUpdateLanguageInput[]): Observable<UpdateResult> {
        return this.businessProvider.importLanguages(languages);
    }

    validateLanguageExcelData(excelData: any[] ) {
      return this.businessProvider.validateLanguageExcelData(excelData );
    }
}

