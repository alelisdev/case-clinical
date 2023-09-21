import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access' 


@InputType()
export class AdminUpdatePermissionInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateFeaturePermissionInput], { nullable: true }) 
  featurePermissions?: UserUpdateFeaturePermissionInput[]


}