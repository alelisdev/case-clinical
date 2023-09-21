import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateFeatureInput } from '@case-clinical/api/feature/data-access' 
import { UserUpdatePermissionInput } from '@case-clinical/api/permission/data-access' 
import { UserUpdateUserFeaturePermissionInput } from '@case-clinical/api/user-feature-permission/data-access' 


@InputType()
export class UserUpdateFeaturePermissionInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featureId?: string

  @Field({ nullable: true }) 
  permissionId?: string

  @Field(() => [UserUpdateUserFeaturePermissionInput], { nullable: true }) 
  userFeaturePermissions?: UserUpdateUserFeaturePermissionInput[]


  @Field(() => UserUpdateFeatureInput ,{ nullable: true }) 
  feature?: UserUpdateFeatureInput  


  @Field(() => UserUpdatePermissionInput ,{ nullable: true }) 
  permission?: UserUpdatePermissionInput  

}