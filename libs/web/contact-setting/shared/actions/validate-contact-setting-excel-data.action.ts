
import { of } from 'rxjs'
import { ContactSettingBusinessActionBase } from './contact-setting.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { Contact, Integration } from '@case-clinical/shared/util/sdk'
export class ValidateContactSettingExcelDataAction extends ContactSettingBusinessActionBase<boolean> {

   excelData: any[];
   contacts: Contact[]
integrations: Integration[]

  valid = false;

  constructor(excelData: any[], contacts: Contact[], integrations: Integration[]) {
    super('ValidateContactSettingExcelDataAction')

    this.excelData = excelData;
this.contacts = contacts
this.integrations = integrations
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`contactName_${index}_is_valid}`, "Contact Is Not Valid", 'contact.name', datum['contact'], this.contacts, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`integrationName_${index}_is_valid}`, "Integration Is Not Valid", 'integration.name', datum['integration'], this.integrations, true)
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
