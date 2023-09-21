import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateUserRoleInput } from '@case-clinical/api/user-role/data-access' 
import { UserUpdateRoleFeaturePermissionInput } from '@case-clinical/api/role-feature-permission/data-access' 


@InputType()
export class AdminUpdateRoleInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateUserRoleInput], { nullable: true }) 
  userRoles?: UserUpdateUserRoleInput[]

  @Field(() => [UserUpdateRoleFeaturePermissionInput], { nullable: true }) 
  roleFeaturePermissions?: UserUpdateRoleFeaturePermissionInput[]


}