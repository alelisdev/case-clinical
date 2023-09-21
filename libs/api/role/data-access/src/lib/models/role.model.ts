import { Field, ObjectType } from '@nestjs/graphql'

import { UserRole } from '@case-clinical/api/user-role/data-access' 
import { RoleFeaturePermission } from '@case-clinical/api/role-feature-permission/data-access' 


@ObjectType()
export class Role {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserRole], { nullable: true }) 
  userRoles?: UserRole[]

  @Field(() => [RoleFeaturePermission], { nullable: true }) 
  roleFeaturePermissions?: RoleFeaturePermission[]


}
