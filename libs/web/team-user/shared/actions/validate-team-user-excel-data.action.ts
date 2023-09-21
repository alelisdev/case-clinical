
import { of } from 'rxjs'
import { TeamUserBusinessActionBase } from './team-user.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { Team, User, TeamRole } from '@case-clinical/shared/util/sdk'
export class ValidateTeamUserExcelDataAction extends TeamUserBusinessActionBase<boolean> {

   excelData: any[];
   teams: Team[]
users: User[]
teamRoles: TeamRole[]

  valid = false;

  constructor(excelData: any[], teams: Team[], users: User[], teamRoles: TeamRole[]) {
    super('ValidateTeamUserExcelDataAction')

    this.excelData = excelData;
this.teams = teams
this.users = users
this.teamRoles = teamRoles
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`teamName_${index}_is_valid}`, "Team Is Not Valid", 'team.name', datum['team'], this.teams, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`userName_${index}_is_valid}`, "User Is Not Valid", 'user.name', datum['user'], this.users, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`teamRoleName_${index}_is_valid}`, "Team Role Is Not Valid", 'teamRole.name', datum['teamRole'], this.teamRoles, true)
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
