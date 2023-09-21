
import {catchError,EMPTY, Observable, switchMap, tap } from 'rxjs'
import {CreateTemplateAction} from './actions/create-template.action'
import {Injectable} from '@angular/core'
import {LoggingService} from '@schema-driven/logging'
import {Template, UserCreateTemplateInput, UserUpdateTemplateInput} from '@case-clinical/shared/util/sdk'
import {ReadExcelAction} from './actions/read-excel.action'
import {ServiceBase,ServiceContext} from '@schema-driven/foundation'
import {UpdateTemplatesAction, UpdateTemplateAction } from './actions/update-templates.action'
import {WebCoreDataAccessService} from '@case-clinical/web/core/data-access'

@Injectable({providedIn: 'root',
})
export class TemplateBusinessProviderService extends ServiceBase {constructor(
    logger: LoggingService,
    public data: WebCoreDataAccessService,
    serviceContext: ServiceContext
  ) {
    super('NotificationService.TemplateBusinessProviderService', logger, serviceContext)
  }

  createTemplate(input: UserCreateTemplateInput): Observable<Template> {
    const action = new CreateTemplateAction(input); 
    action.Do(this);
    return action.response;   
  }

  updateTemplate(input: UserUpdateTemplateInput, templateId: string): Observable<Template> {
    const action = new UpdateTemplateAction(input, templateId); 
    action.Do(this);
    return action.response;   
  }
  
  importTemplates(templates: UserUpdateTemplateInput[]): Observable<boolean> {
    const updateTemplatesAction = new UpdateTemplatesAction(templates);
    updateTemplatesAction.Do(this)
    return updateTemplatesAction.response;
  }
}

