import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdatePermissionInput } from '@case-clinical/api/permission/data-access' 


@InputType()
export class AdminUpdateRolePermissionInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  roleId?: string

  @Field({ nullable: true }) 
  permissionId?: string


  @Field(() => AdminUpdatePermissionInput ,{ nullable: true }) 
  permission?: AdminUpdatePermissionInput  

}