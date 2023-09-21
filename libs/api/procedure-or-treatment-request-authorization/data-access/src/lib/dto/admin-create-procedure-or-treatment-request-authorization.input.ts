import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 
import { AdminCreateProcedureOrTreatmentRequestInput } from '@case-clinical/api/procedure-or-treatment-request/data-access' 


@InputType()
export class AdminCreateProcedureOrTreatmentRequestAuthorizationInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  authorizationId?: string

  @Field({ nullable: true }) 
  procedureOrTreatmentRequestId?: string


  @Field(() => AdminCreateAuthorizationInput ,{ nullable: true }) 
  authorization?: AdminCreateAuthorizationInput  


  @Field(() => AdminCreateProcedureOrTreatmentRequestInput ,{ nullable: true }) 
  procedureOrTreatmentRequest?: AdminCreateProcedureOrTreatmentRequestInput  

}