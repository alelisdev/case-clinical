import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserUpdateSpecialtyInput } from '@case-clinical/api/specialty/data-access'
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access'


@InputType()
export class UserUpdateFavoriteProviderInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  userId?: string

  @Field({ nullable: true }) 
  specialtyId?: string


  @Field(() => UserUpdateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserUpdateClinicalProviderInput  
  @Field(() => UserUpdateSpecialtyInput ,{ nullable: true }) 
  specialty?: UserUpdateSpecialtyInput
  
  @Field(() => UserUpdateUserInput ,{ nullable: true }) 
  user?: UserUpdateUserInput 
}