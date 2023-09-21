import { Field, InputType } from '@nestjs/graphql'

import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserCreateSpecialtyInput } from '@case-clinical/api/specialty/data-access'
import { UserCreateUserInput } from '@case-clinical/api/user/data-access'


@InputType()
export class UserCreateFavoriteProviderInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  userId?: string

  @Field({ nullable: true }) 
  specialtyId?: string


  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserCreateClinicalProviderInput 
  @Field(() => UserCreateSpecialtyInput ,{ nullable: true }) 
  specialty?: UserCreateSpecialtyInput 
  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  user?: UserCreateUserInput  

}
