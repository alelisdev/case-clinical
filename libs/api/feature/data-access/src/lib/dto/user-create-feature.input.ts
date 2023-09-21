import { Field, InputType } from '@nestjs/graphql'

import { UserCreateUserFeatureInput } from '@case-clinical/api/user-feature/data-access' 
import { UserCreateFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access' 


@InputType()
export class UserCreateFeatureInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateUserFeatureInput], { nullable: true }) 
  userFeatures?: UserCreateUserFeatureInput[]

  @Field(() => [UserCreateFeaturePermissionInput], { nullable: true }) 
  featurePermissions?: UserCreateFeaturePermissionInput[]


}
