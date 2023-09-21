import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateUserFeatureInput } from '@case-clinical/api/user-feature/data-access' 
import { UserUpdateFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access' 


@InputType()
export class UserUpdateFeatureInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserUpdateUserFeatureInput], { nullable: true }) 
  userFeatures?: UserUpdateUserFeatureInput[]

  @Field(() => [UserUpdateFeaturePermissionInput], { nullable: true }) 
  featurePermissions?: UserUpdateFeaturePermissionInput[]


}