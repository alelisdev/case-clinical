import { Field, InputType } from '@nestjs/graphql'

import { UserCreateUserRoleInput } from '@case-clinical/api/user-role/data-access' 
import { UserCreateRoleFeaturePermissionInput } from '@case-clinical/api/role-feature-permission/data-access' 


@InputType()
export class UserCreateRoleInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateUserRoleInput], { nullable: true }) 
  userRoles?: UserCreateUserRoleInput[]

  @Field(() => [UserCreateRoleFeaturePermissionInput], { nullable: true }) 
  roleFeaturePermissions?: UserCreateRoleFeaturePermissionInput[]


}
