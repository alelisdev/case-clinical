import { Field, InputType } from '@nestjs/graphql'

import { UserCreateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 
import { UserCreateProcedureOrTreatmentRequestInput } from '@case-clinical/api/procedure-or-treatment-request/data-access' 


@InputType()
export class UserCreateProcedureOrTreatmentRequestAuthorizationInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  authorizationId?: string

  @Field({ nullable: true }) 
  procedureOrTreatmentRequestId?: string


  @Field(() => UserCreateAuthorizationInput ,{ nullable: true }) 
  authorization?: UserCreateAuthorizationInput  


  @Field(() => UserCreateProcedureOrTreatmentRequestInput ,{ nullable: true }) 
  procedureOrTreatmentRequest?: UserCreateProcedureOrTreatmentRequestInput  

}
