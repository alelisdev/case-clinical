
import { of } from 'rxjs'
import { UserRoleBusinessActionBase } from './user-role.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { Role, User } from '@case-clinical/shared/util/sdk'
export class ValidateUserRoleExcelDataAction extends UserRoleBusinessActionBase<boolean> {

   excelData: any[];
   roles: Role[]
users: User[]

  valid = false;

  constructor(excelData: any[], roles: Role[], users: User[]) {
    super('ValidateUserRoleExcelDataAction')

    this.excelData = excelData;
this.roles = roles
this.users = users
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`roleName_${index}_is_valid}`, "Role Is Not Valid", 'role.name', datum['role'], this.roles, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`userName_${index}_is_valid}`, "User Is Not Valid", 'user.name', datum['user'], this.users, true)
            )
    })

    // Check Duplicate Error
    this.validationContext.addRule(
      new ImportDuplicateRule('nameIsUnique', 'Name should be unique', names, true)
    )
  }

  performAction() {

  }

  finish(): void {
    super.finish();

    const unknownNamesByColumn: Record<string, Record<string, any>> = {}
    let conflictNames = []

    if(this.validationContext.hasRuleViolations()) {this.valid = false;
      this.validationContext.rules.map((rule) => {
        if(rule instanceof ImportSolutionRule) {
          if(!rule.isValid) {
            if(!unknownNamesByColumn[rule.columnName]) {
              unknownNamesByColumn[rule.columnName] = {
                options: rule.possibleValueList.map((el) => el.name),
                newNames: [ rule.newName ]
              };
            } else {
              if(!unknownNamesByColumn[rule.columnName]['newNames'].includes(rule.newName)) {
                unknownNamesByColumn[rule.columnName]['newNames'].push(rule.newName)
              }
            }
          }
        } else if(rule instanceof ImportDuplicateRule) {
          if(!rule.isValid) conflictNames = rule.conflicts;
        }
      })
    }
    else
      this.valid = true;

    this.response = of({
      valid: this.valid,
      excelData: this.excelData,
      conflictNames,
      unknownNames: unknownNamesByColumn,
     });
  }
}
