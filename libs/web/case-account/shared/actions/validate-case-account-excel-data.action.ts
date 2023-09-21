
import { of } from 'rxjs'
import { CaseAccountBusinessActionBase } from './case-account.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { LegalCase, Location, Vendor, AccountStatus, ProcedureType, AgreementType, ClaimProcedure, InvoiceDetail, Contract, Portfolio, ProcedureVendor } from '@case-clinical/shared/util/sdk'
export class ValidateCaseAccountExcelDataAction extends CaseAccountBusinessActionBase<boolean> {

   excelData: any[];
   legalCases: LegalCase[]
locations: Location[]
vendors: Vendor[]
accountStatuses: AccountStatus[]
procedureTypes: ProcedureType[]
agreementTypes: AgreementType[]
claimProcedures: ClaimProcedure[]
invoiceDetails: InvoiceDetail[]
contracts: Contract[]
portfolios: Portfolio[]
procedureVendors: ProcedureVendor[]

  valid = false;

  constructor(excelData: any[], legalCases: LegalCase[], locations: Location[], vendors: Vendor[], accountStatuses: AccountStatus[], procedureTypes: ProcedureType[], agreementTypes: AgreementType[], claimProcedures: ClaimProcedure[], invoiceDetails: InvoiceDetail[], contracts: Contract[], portfolios: Portfolio[], procedureVendors: ProcedureVendor[]) {
    super('ValidateCaseAccountExcelDataAction')

    this.excelData = excelData;
this.legalCases = legalCases
this.locations = locations
this.vendors = vendors
this.accountStatuses = accountStatuses
this.procedureTypes = procedureTypes
this.agreementTypes = agreementTypes
this.claimProcedures = claimProcedures
this.invoiceDetails = invoiceDetails
this.contracts = contracts
this.portfolios = portfolios
this.procedureVendors = procedureVendors
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`legalCaseName_${index}_is_valid}`, "Legal Case Is Not Valid", 'legalCase.name', datum['legalCase'], this.legalCases, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`locationName_${index}_is_valid}`, "Location Is Not Valid", 'location.name', datum['location'], this.locations, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`vendorName_${index}_is_valid}`, "Vendor Is Not Valid", 'vendor.name', datum['vendor'], this.vendors, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`accountStatusName_${index}_is_valid}`, "Account Status Is Not Valid", 'accountStatus.name', datum['accountStatus'], this.accountStatuses, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`procedureTypeName_${index}_is_valid}`, "Procedure Type Is Not Valid", 'procedureType.name', datum['procedureType'], this.procedureTypes, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`agreementTypeName_${index}_is_valid}`, "Agreement Type Is Not Valid", 'agreementType.name', datum['agreementType'], this.agreementTypes, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`claimProcedureName_${index}_is_valid}`, "Claim Procedure Is Not Valid", 'claimProcedure.name', datum['claimProcedure'], this.claimProcedures, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`invoiceDetailName_${index}_is_valid}`, "Invoice Detail Is Not Valid", 'invoiceDetail.name', datum['invoiceDetail'], this.invoiceDetails, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`contractName_${index}_is_valid}`, "Contract Is Not Valid", 'contract.name', datum['contract'], this.contracts, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`portfolioName_${index}_is_valid}`, "Portfolio Is Not Valid", 'portfolio.name', datum['portfolio'], this.portfolios, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`procedureVendorName_${index}_is_valid}`, "Procedure Vendor Is Not Valid", 'procedureVendor.name', datum['procedureVendor'], this.procedureVendors, true)
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
