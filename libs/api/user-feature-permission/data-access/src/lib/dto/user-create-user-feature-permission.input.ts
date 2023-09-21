import { Field, InputType } from '@nestjs/graphql'

import { UserCreateFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access' 
import { UserCreateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class UserCreateUserFeaturePermissionInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featurePermissionId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => UserCreateFeaturePermissionInput ,{ nullable: true }) 
  featurePermission?: UserCreateFeaturePermissionInput  


  @Field(() => UserCreateUserInput ,{ nullable: true }) 
  user?: UserCreateUserInput  

}
