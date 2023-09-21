import { Field, InputType } from '@nestjs/graphql'

import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserCreateSpecialtyInput } from '@case-clinical/api/specialty/data-access' 


@InputType()
export class UserCreateClinicalProviderSpecialtyInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  npi?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  specialtyId?: string


  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserCreateClinicalProviderInput  


  @Field(() => UserCreateSpecialtyInput ,{ nullable: true }) 
  specialty?: UserCreateSpecialtyInput  

}
