import { Field, InputType } from '@nestjs/graphql'

import { UserCreatePermissionInput } from '@case-clinical/api/permission/data-access' 


@InputType()
export class UserCreateRolePermissionInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  roleId?: string

  @Field({ nullable: true }) 
  permissionId?: string


  @Field(() => UserCreatePermissionInput ,{ nullable: true }) 
  permission?: UserCreatePermissionInput  

}
