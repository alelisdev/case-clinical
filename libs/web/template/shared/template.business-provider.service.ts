
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoggingService } from '@schema-driven/logging'
import { ServiceBase,ServiceContext } from '@schema-driven/foundation'
import { Template, UserCreateTemplateInput, UserUpdateTemplateInput, UpdateResult, Team, User, TeamRole } from '@case-clinical/shared/util/sdk'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access'
// import { ValidateTemplateExcelDataAction } from './actions/validate-template-excel-data.action'
import { CreateTemplateAction } from './actions/create-template.action'
import { UpdateTemplatesAction, UpdateTemplateAction } from './actions/update-templates.action'


@Injectable({providedIn: 'root'})
export class TemplateBusinessProviderService extends ServiceBase {
  constructor(
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

  updateTemplate(input: UserUpdateTemplateInput, teamUserId: string): Observable<Template> {
    const action = new UpdateTemplateAction(input, teamUserId); 
    action.Do(this);
    return action.response;   
  }
  
  importTemplates(teamUsers: UserUpdateTemplateInput[]): Observable<UpdateResult> {
    const updateTemplatesAction = new UpdateTemplatesAction(teamUsers);
    updateTemplatesAction.Do(this)
    return updateTemplatesAction.response;
  }

  validateTemplateExcelData(excelData: any[], teams: Team[], users: User[], teamRoles: TeamRole[]) {
    // const validateTemplateExcelDataAction = new ValidateTemplateExcelDataAction(excelData, teams, users, teamRoles);
    // validateTemplateExcelDataAction.Do(this)
    // return validateTemplateExcelDataAction.response;
  }
}

