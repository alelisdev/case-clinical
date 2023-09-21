import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateFeatureInput } from '@case-clinical/api/feature/data-access' 
import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminUpdateUserFeatureInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featureId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => AdminUpdateFeatureInput ,{ nullable: true }) 
  feature?: AdminUpdateFeatureInput  


  @Field(() => AdminUpdateUserInput ,{ nullable: true }) 
  user?: AdminUpdateUserInput  

}