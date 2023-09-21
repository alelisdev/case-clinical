import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 
import { UserUpdateProcedureOrTreatmentRequestInput } from '@case-clinical/api/procedure-or-treatment-request/data-access' 


@InputType()
export class UserUpdateProcedureOrTreatmentRequestAuthorizationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  authorizationId?: string

  @Field({ nullable: true }) 
  procedureOrTreatmentRequestId?: string


  @Field(() => UserUpdateAuthorizationInput ,{ nullable: true }) 
  authorization?: UserUpdateAuthorizationInput  


  @Field(() => UserUpdateProcedureOrTreatmentRequestInput ,{ nullable: true }) 
  procedureOrTreatmentRequest?: UserUpdateProcedureOrTreatmentRequestInput  

}