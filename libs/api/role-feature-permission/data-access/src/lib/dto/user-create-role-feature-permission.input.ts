import { Field, InputType } from '@nestjs/graphql'

import { UserCreateFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access' 
import { UserCreateRoleInput } from '@case-clinical/api/role/data-access' 


@InputType()
export class UserCreateRoleFeaturePermissionInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featurePermissionId?: string

  @Field({ nullable: true }) 
  roleId?: string


  @Field(() => UserCreateFeaturePermissionInput ,{ nullable: true }) 
  featurePermission?: UserCreateFeaturePermissionInput  


  @Field(() => UserCreateRoleInput ,{ nullable: true }) 
  role?: UserCreateRoleInput  

}
