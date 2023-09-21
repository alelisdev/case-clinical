
import { of } from 'rxjs'
import { ContactPhoneNumberBusinessActionBase } from './contact-phone-number.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { Country, Contact } from '@case-clinical/shared/util/sdk'
export class ValidateContactPhoneNumberExcelDataAction extends ContactPhoneNumberBusinessActionBase<boolean> {

   excelData: any[];
   countries: Country[]
contacts: Contact[]

  valid = false;

  constructor(excelData: any[], countries: Country[], contacts: Contact[]) {
    super('ValidateContactPhoneNumberExcelDataAction')

    this.excelData = excelData;
this.countries = countries
this.contacts = contacts
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`countryName_${index}_is_valid}`, "Country Is Not Valid", 'country.name', datum['country'], this.countries, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`contactName_${index}_is_valid}`, "Contact Is Not Valid", 'contact.name', datum['contact'], this.contacts, true)
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
