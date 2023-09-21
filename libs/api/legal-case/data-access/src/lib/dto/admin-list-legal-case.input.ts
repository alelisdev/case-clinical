import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListLegalCaseInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  accidentTypeId?: string  


  @Field({ nullable: true }) 
  patientId?: string  


  @Field({ nullable: true }) 
  medLevelId?: string  


  @Field({ nullable: true }) 
  firmId?: string  


  @Field({ nullable: true }) 
  attorneyId?: string  


  @Field({ nullable: true }) 
  caseStatusId?: string  


  @Field({ nullable: true }) 
  caseTypeId?: string  


  @Field({ nullable: true }) 
  patientTreatmentStatusId?: string  


  @Field({ nullable: true }) 
  caseProgressStatusId?: string  


  @Field({ nullable: true }) 
  adverseInsuranceStatusId?: string  


}
