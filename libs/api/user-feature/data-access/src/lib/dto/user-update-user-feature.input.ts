import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateFeatureInput } from '@case-clinical/api/feature/data-access' 
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class UserUpdateUserFeatureInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featureId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => UserUpdateFeatureInput ,{ nullable: true }) 
  feature?: UserUpdateFeatureInput  


  @Field(() => UserUpdateUserInput ,{ nullable: true }) 
  user?: UserUpdateUserInput  

}