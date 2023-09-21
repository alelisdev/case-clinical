import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access' 
import { UserUpdateRoleInput } from '@case-clinical/api/role/data-access' 


@InputType()
export class UserUpdateRoleFeaturePermissionInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featurePermissionId?: string

  @Field({ nullable: true }) 
  roleId?: string


  @Field(() => UserUpdateFeaturePermissionInput ,{ nullable: true }) 
  featurePermission?: UserUpdateFeaturePermissionInput  


  @Field(() => UserUpdateRoleInput ,{ nullable: true }) 
  role?: UserUpdateRoleInput  

}