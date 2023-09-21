import { Field, ObjectType } from '@nestjs/graphql'

import { Permission } from '@case-clinical/api/permission/data-access'


@ObjectType()
export class RolePermission {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  roleId?: string

  @Field({ nullable: true }) 
  permissionId?: string


  @Field(() => Permission, { nullable: true }) 
  permission?: Permission  

}
