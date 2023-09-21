import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 
import { AdminUpdateProcedureOrTreatmentRequestInput } from '@case-clinical/api/procedure-or-treatment-request/data-access' 


@InputType()
export class AdminUpdateProcedureOrTreatmentRequestAuthorizationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  authorizationId?: string

  @Field({ nullable: true }) 
  procedureOrTreatmentRequestId?: string


  @Field(() => AdminUpdateAuthorizationInput ,{ nullable: true }) 
  authorization?: AdminUpdateAuthorizationInput  


  @Field(() => AdminUpdateProcedureOrTreatmentRequestInput ,{ nullable: true }) 
  procedureOrTreatmentRequest?: AdminUpdateProcedureOrTreatmentRequestInput  

}