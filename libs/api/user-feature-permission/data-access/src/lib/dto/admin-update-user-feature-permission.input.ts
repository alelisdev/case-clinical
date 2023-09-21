import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access' 
import { AdminUpdateUserInput } from '@case-clinical/api/user/data-access' 


@InputType()
export class AdminUpdateUserFeaturePermissionInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featurePermissionId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => AdminUpdateFeaturePermissionInput ,{ nullable: true }) 
  featurePermission?: AdminUpdateFeaturePermissionInput  


  @Field(() => AdminUpdateUserInput ,{ nullable: true }) 
  user?: AdminUpdateUserInput  

}