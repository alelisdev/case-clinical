import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access' 
import { AdminCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminCreateUserFeaturePermissionInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featurePermissionId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => AdminCreateFeaturePermissionInput ,{ nullable: true }) 
  featurePermission?: AdminCreateFeaturePermissionInput  


  @Field(() => AdminCreateUserInput ,{ nullable: true }) 
  user?: AdminCreateUserInput  

}