import { Field, InputType } from '@nestjs/graphql'

import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 


@InputType()
export class UserCreatePchProviderInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string


  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserCreateClinicalProviderInput  

}
