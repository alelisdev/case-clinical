import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access' 
import { AdminCreateRoleInput } from '@case-clinical/api/role/data-access' 


@InputType()
export class AdminCreateRoleFeaturePermissionInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featurePermissionId?: string

  @Field({ nullable: true }) 
  roleId?: string


  @Field(() => AdminCreateFeaturePermissionInput ,{ nullable: true }) 
  featurePermission?: AdminCreateFeaturePermissionInput  


  @Field(() => AdminCreateRoleInput ,{ nullable: true }) 
  role?: AdminCreateRoleInput  

}