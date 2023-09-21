import { Field, InputType } from '@nestjs/graphql'

import { UserCreateClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access' 
import { UserCreateTagInput } from '@case-clinical/api/tag/data-access' 


@InputType()
export class UserCreateClinicalProviderTagInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  clinicalProviderId?: string

  @Field({ nullable: true }) 
  tagId?: string


  @Field(() => UserCreateClinicalProviderInput ,{ nullable: true }) 
  clinicalProvider?: UserCreateClinicalProviderInput  


  @Field(() => UserCreateTagInput ,{ nullable: true }) 
  tag?: UserCreateTagInput  

}
