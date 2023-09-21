import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access' 
import { UserUpdateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class UserUpdateUserFeaturePermissionInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featurePermissionId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => UserUpdateFeaturePermissionInput ,{ nullable: true }) 
  featurePermission?: UserUpdateFeaturePermissionInput  


  @Field(() => UserUpdateUserInput ,{ nullable: true }) 
  user?: UserUpdateUserInput  

}