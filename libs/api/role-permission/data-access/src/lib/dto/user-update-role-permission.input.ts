import { Field, InputType } from '@nestjs/graphql'

import { UserUpdatePermissionInput } from '@case-clinical/api/permission/data-access' 


@InputType()
export class UserUpdateRolePermissionInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  roleId?: string

  @Field({ nullable: true }) 
  permissionId?: string


  @Field(() => UserUpdatePermissionInput ,{ nullable: true }) 
  permission?: UserUpdatePermissionInput  

}