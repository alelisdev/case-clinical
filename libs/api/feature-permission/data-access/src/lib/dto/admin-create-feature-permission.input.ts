import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateFeatureInput } from '@case-clinical/api/feature/data-access' 
import { AdminCreatePermissionInput } from '@case-clinical/api/permission/data-access' 
import { AdminCreateUserFeaturePermissionInput } from '@case-clinical/api/user-feature-permission/data-access' 


@InputType()
export class AdminCreateFeaturePermissionInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featureId?: string

  @Field({ nullable: true }) 
  permissionId?: string

  @Field(() => [AdminCreateUserFeaturePermissionInput], { nullable: true }) 
  userFeaturePermissions?: AdminCreateUserFeaturePermissionInput[]


  @Field(() => AdminCreateFeatureInput ,{ nullable: true }) 
  feature?: AdminCreateFeatureInput  


  @Field(() => AdminCreatePermissionInput ,{ nullable: true }) 
  permission?: AdminCreatePermissionInput  

}