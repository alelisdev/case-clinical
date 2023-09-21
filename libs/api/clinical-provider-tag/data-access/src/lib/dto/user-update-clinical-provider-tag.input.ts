import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserUpdateTagInput } from '@case-clinical/api/tag/data-access' 


@InputType()
export class UserUpdateClinicalProviderTagInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  tagId?: string


  @Field(() => UserUpdateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserUpdateClinicalProviderInput  


  @Field(() => UserUpdateTagInput ,{ nullable: true }) 
  tag?: UserUpdateTagInput  

}