import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListPriorAuthorizationRequestInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  procedureSiteId?: string  


  @Field({ nullable: true }) 
  surgicalPositionId?: string  


  @Field({ nullable: true }) 
  treatingProviderId?: string  


  @Field({ nullable: true }) 
  referredToId?: string  


  @Field({ nullable: true }) 
  prescriptionId?: string  


  @Field({ nullable: true }) 
  visitKindId?: string  


  @Field({ nullable: true }) 
  guidelineUsedId?: string  


  @Field({ nullable: true }) 
  authorizationKindId?: string  


  @Field({ nullable: true }) 
  authorizationStatusId?: string  


  @Field({ nullable: true }) 
  billId?: string  


  @Field({ nullable: true }) 
  medicalReportId?: string  


  @Field({ nullable: true }) 
  patientId?: string  


  @Field({ nullable: true }) 
  caseProcedureId?: string  


}
