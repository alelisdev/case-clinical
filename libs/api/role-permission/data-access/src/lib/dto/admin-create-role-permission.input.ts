import { Field, InputType } from '@nestjs/graphql'

import { AdminCreatePermissionInput } from '@case-clinical/api/permission/data-access' 


@InputType()
export class AdminCreateRolePermissionInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  roleId?: string

  @Field({ nullable: true }) 
  permissionId?: string


  @Field(() => AdminCreatePermissionInput ,{ nullable: true }) 
  permission?: AdminCreatePermissionInput  

}