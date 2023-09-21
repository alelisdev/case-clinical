
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Language, UserCreateLanguageInput, UserUpdateLanguageInput, UpdateResult,  } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
import { ValidateLanguageExcelDataAction } from './actions/validate-language-excel-data.action'
import { CreateLanguageAction } from './actions/create-language.action'
import { UpdateLanguagesAction, UpdateLanguageAction } from './actions/update-languages.action'


@Injectable({providedIn: 'root'})
export class LanguageBusinessProviderService extends ServiceBase {
  constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.LanguageBusinessProviderService', logger, serviceContext)
  }

  createLanguage(input: UserCreateLanguageInput): Observable<Language> {
    const action = new CreateLanguageAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateLanguage(input: UserUpdateLanguageInput, languageId: string): Observable<Language> {
    const action = new UpdateLanguageAction(input, languageId); 
    action.Do(this);
    return action.response;   
  }
  
  importLanguages(languages: UserUpdateLanguageInput[]): Observable<UpdateResult> {
    const updateLanguagesAction = new UpdateLanguagesAction(languages);
    updateLanguagesAction.Do(this)
    return updateLanguagesAction.response;
  }

  validateLanguageExcelData(excelData: any[] ) {
    const validateLanguageExcelDataAction = new ValidateLanguageExcelDataAction(excelData );
    validateLanguageExcelDataAction.Do(this)
    return validateLanguageExcelDataAction.response;
  }
}

