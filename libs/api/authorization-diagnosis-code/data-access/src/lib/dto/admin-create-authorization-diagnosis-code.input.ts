import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access' 
import { AdminCreateAuthorizationInput } from '@case-clinical/api/authorization/data-access' 


@InputType()
export class AdminCreateAuthorizationDiagnosisCodeInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  diagnosisCodeId?: string

  @Field({ nullable: true }) 
  authorizationId?: string


  @Field(() => AdminCreateDiagnosisCodeInput ,{ nullable: true }) 
  diagnosis?: AdminCreateDiagnosisCodeInput  


  @Field(() => AdminCreateAuthorizationInput ,{ nullable: true }) 
  authorization?: AdminCreateAuthorizationInput  

}