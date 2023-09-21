import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateFeatureInput } from '@case-clinical/api/feature/data-access' 
import { AdminUpdatePermissionInput } from '@case-clinical/api/permission/data-access' 
import { UserUpdateUserFeaturePermissionInput } from '@case-clinical/api/user-feature-permission/data-access' 


@InputType()
export class AdminUpdateFeaturePermissionInput {

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


  @Field(() => AdminUpdateFeatureInput ,{ nullable: true }) 
  feature?: AdminUpdateFeatureInput  


  @Field(() => AdminUpdatePermissionInput ,{ nullable: true }) 
  permission?: AdminUpdatePermissionInput  

}