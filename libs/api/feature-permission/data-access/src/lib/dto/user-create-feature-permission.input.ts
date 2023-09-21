import { Field, InputType } from '@nestjs/graphql'

import { UserCreateFeatureInput } from '@case-clinical/api/feature/data-access' 
import { UserCreatePermissionInput } from '@case-clinical/api/permission/data-access' 
import { UserCreateUserFeaturePermissionInput } from '@case-clinical/api/user-feature-permission/data-access' 


@InputType()
export class UserCreateFeaturePermissionInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featureId?: string

  @Field({ nullable: true }) 
  permissionId?: string

  @Field(() => [UserCreateUserFeaturePermissionInput], { nullable: true }) 
  userFeaturePermissions?: UserCreateUserFeaturePermissionInput[]


  @Field(() => UserCreateFeatureInput ,{ nullable: true }) 
  feature?: UserCreateFeatureInput  


  @Field(() => UserCreatePermissionInput ,{ nullable: true }) 
  permission?: UserCreatePermissionInput  

}
