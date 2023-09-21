
import { of } from 'rxjs'
import { ContractBusinessActionBase } from './contract.business-action-base'
import { ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { Organization, Template, Vendor, ReconciliationPeriodType, CalculationBasisType, Process } from '@case-clinical/shared/util/sdk'
export class ValidateContractExcelDataAction extends ContractBusinessActionBase<boolean> {

   excelData: any[];
   organizations: Organization[]
billingOrganizations: Organization[]
templates: Template[]
vendors: Vendor[]
reconciliationPeriodTypes: ReconciliationPeriodType[]
calculationBasisTypes: CalculationBasisType[]
processes: Process[]

  valid = false;

  constructor(excelData: any[], organizations: Organization[], billingOrganizations: Organization[], templates: Template[], vendors: Vendor[], reconciliationPeriodTypes: ReconciliationPeriodType[], calculationBasisTypes: CalculationBasisType[], processes: Process[]) {
    super('ValidateContractExcelDataAction')

    this.excelData = excelData;
this.organizations = organizations
this.billingOrganizations = billingOrganizations
this.templates = templates
this.vendors = vendors
this.reconciliationPeriodTypes = reconciliationPeriodTypes
this.calculationBasisTypes = calculationBasisTypes
this.processes = processes
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);

            this.validationContext.addRule(
              new ImportSolutionRule(`organizationName_${index}_is_valid}`, "Organization Is Not Valid", 'organization.name', datum['organization'], this.organizations, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`billingOrganizationName_${index}_is_valid}`, "Billing Organization Is Not Valid", 'billingOrganization.name', datum['billingOrganization'], this.billingOrganizations, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`templateName_${index}_is_valid}`, "Template Is Not Valid", 'template.name', datum['template'], this.templates, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`vendorName_${index}_is_valid}`, "Vendor Is Not Valid", 'vendor.name', datum['vendor'], this.vendors, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`reconciliationPeriodTypeName_${index}_is_valid}`, "Reconciliation Period Type Is Not Valid", 'reconciliationPeriodType.name', datum['reconciliationPeriodType'], this.reconciliationPeriodTypes, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`calculationBasisTypeName_${index}_is_valid}`, "Calculation Basis Type Is Not Valid", 'calculationBasisType.name', datum['calculationBasisType'], this.calculationBasisTypes, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`processName_${index}_is_valid}`, "Process Is Not Valid", 'process.name', datum['process'], this.processes, true)
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
