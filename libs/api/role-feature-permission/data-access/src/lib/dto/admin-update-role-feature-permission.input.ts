import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access' 
import { AdminUpdateRoleInput } from '@case-clinical/api/role/data-access' 


@InputType()
export class AdminUpdateRoleFeaturePermissionInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featurePermissionId?: string

  @Field({ nullable: true }) 
  roleId?: string


  @Field(() => AdminUpdateFeaturePermissionInput ,{ nullable: true }) 
  featurePermission?: AdminUpdateFeaturePermissionInput  


  @Field(() => AdminUpdateRoleInput ,{ nullable: true }) 
  role?: AdminUpdateRoleInput  

}