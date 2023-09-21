import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateFeatureInput } from '@case-clinical/api/feature/data-access' 
import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminCreateUserFeatureInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featureId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => AdminCreateFeatureInput ,{ nullable: true }) 
  feature?: AdminCreateFeatureInput  


  @Field(() => AdminCreateUserInput ,{ nullable: true }) 
  user?: AdminCreateUserInput  

}