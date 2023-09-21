
import { of } from 'rxjs'
import { TaskTagBusinessActionBase } from './task-tag.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { TaskItem, Tag } from '@case-clinical/shared/util/sdk'
export class ValidateTaskTagExcelDataAction extends TaskTagBusinessActionBase<boolean> {

   excelData: any[];
   tasks: TaskItem[]
tags: Tag[]

  valid = false;

  constructor(excelData: any[], tasks: TaskItem[], tags: Tag[]) {
    super('ValidateTaskTagExcelDataAction')

    this.excelData = excelData;
this.tasks = tasks
this.tags = tags
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`taskName_${index}_is_valid}`, "Task Is Not Valid", 'task.name', datum['task'], this.tasks, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`tagName_${index}_is_valid}`, "Tag Is Not Valid", 'tag.name', datum['tag'], this.tags, true)
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
