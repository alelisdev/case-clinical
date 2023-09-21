
import { of } from 'rxjs'
import { InvoiceBusinessActionBase } from './invoice.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { Organization, LegalCase, Document } from '@case-clinical/shared/util/sdk'
export class ValidateInvoiceExcelDataAction extends InvoiceBusinessActionBase<boolean> {

   excelData: any[];
   billingOrganizations: Organization[]
legalCases: LegalCase[]
invoices: Document[]

  valid = false;

  constructor(excelData: any[], billingOrganizations: Organization[], legalCases: LegalCase[], invoices: Document[]) {
    super('ValidateInvoiceExcelDataAction')

    this.excelData = excelData;
this.billingOrganizations = billingOrganizations
this.legalCases = legalCases
this.invoices = invoices
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`billingOrganizationName_${index}_is_valid}`, "Billing Organization Is Not Valid", 'billingOrganization.name', datum['billingOrganization'], this.billingOrganizations, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`legalCaseName_${index}_is_valid}`, "Legal Case Is Not Valid", 'legalCase.name', datum['legalCase'], this.legalCases, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`invoiceName_${index}_is_valid}`, "Invoice Is Not Valid", 'invoice.name', datum['invoice'], this.invoices, true)
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
