import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { UserUpdateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 


@InputType()
export class UserUpdateAuthorizationDiagnosisCodeInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  authorizationId?: string


  @Field(() => UserUpdateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: UserUpdateDiagnosisCodeInput  


  @Field(() => UserUpdateAuthorizationInput ,{ nullable: true }) 
  authorization?: UserUpdateAuthorizationInput  

}