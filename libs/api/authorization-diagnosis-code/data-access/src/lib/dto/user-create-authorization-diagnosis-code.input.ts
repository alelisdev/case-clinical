import { Field, InputType } from '@nestjs/graphql'

import { UserCreateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { UserCreateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 


@InputType()
export class UserCreateAuthorizationDiagnosisCodeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  authorizationId?: string


  @Field(() => UserCreateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: UserCreateDiagnosisCodeInput  


  @Field(() => UserCreateAuthorizationInput ,{ nullable: true }) 
  authorization?: UserCreateAuthorizationInput  

}
