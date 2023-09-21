import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateUserRoleInput } from '@case-clinical/api/user-role/data-access' 
import { AdminCreateRoleFeaturePermissionInput } from '@case-clinical/api/role-feature-permission/data-access' 


@InputType()
export class AdminCreateRoleInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateUserRoleInput], { nullable: true }) 
  userRoles?: AdminCreateUserRoleInput[]

  @Field(() => [AdminCreateRoleFeaturePermissionInput], { nullable: true }) 
  roleFeaturePermissions?: AdminCreateRoleFeaturePermissionInput[]


}