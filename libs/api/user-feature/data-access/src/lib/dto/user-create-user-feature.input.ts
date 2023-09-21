import { Field, InputType } from '@nestjs/graphql'

import { UserCreateFeatureInput } from '@case-clinical/api/feature/data-access' 
import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class UserCreateUserFeatureInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featureId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => UserCreateFeatureInput ,{ nullable: true }) 
  feature?: UserCreateFeatureInput  


  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  user?: UserCreateUserInput  

}
