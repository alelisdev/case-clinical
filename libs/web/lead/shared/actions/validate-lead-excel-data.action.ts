
import { of } from 'rxjs'
import { LeadBusinessActionBase } from './lead.business-action-base'
import { StringIsNotNullEmptyRange, ImportSolutionRule, ImportDuplicateRule } from '@schema-driven/rules-engine';
import { AccidentType, Document, LeadStatus, LeadSource, User } from '@case-clinical/shared/util/sdk'
export class ValidateLeadExcelDataAction extends LeadBusinessActionBase<boolean> {

   excelData: any[];
   accidentTypes: AccidentType[]
driversLicenses: Document[]
policeReportAttachments: Document[]
phoneRecordings: Document[]
statuses: LeadStatus[]
sourceOfLeads: LeadSource[]
submittedBies: User[]

  valid = false;

  constructor(excelData: any[], accidentTypes: AccidentType[], statuses: LeadStatus[], sourceOfLeads: LeadSource[], submittedBies: User[]) {
    super('ValidateLeadExcelDataAction')

    this.excelData = excelData;
this.accidentTypes = accidentTypes
this.statuses = statuses
this.sourceOfLeads = sourceOfLeads
this.submittedBies = submittedBies
  }

  preValidateAction() {
    const names = []
    this.excelData.map((datum, index) => {
      names.push(datum['name']);
      
            this.validationContext.addRule(
              new ImportSolutionRule(`accidentTypeName_${index}_is_valid}`, "Accident Type Is Not Valid", 'accidentType.name', datum['accidentType'], this.accidentTypes, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`statusName_${index}_is_valid}`, "Status Is Not Valid", 'status.name', datum['status'], this.statuses, true)
            )

            this.validationContext.addRule(
              new ImportSolutionRule(`sourceOfLeadName_${index}_is_valid}`, "Source of Lead Is Not Valid", 'sourceOfLead.name', datum['sourceOfLead'], this.sourceOfLeads, true)
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
