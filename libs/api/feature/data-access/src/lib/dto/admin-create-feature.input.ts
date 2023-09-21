import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateUserFeatureInput } from '@case-clinical/api/user-feature/data-access' 
import { AdminCreateFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access' 


@InputType()
export class AdminCreateFeatureInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateUserFeatureInput], { nullable: true }) 
  userFeatures?: AdminCreateUserFeatureInput[]

  @Field(() => [AdminCreateFeaturePermissionInput], { nullable: true }) 
  featurePermissions?: AdminCreateFeaturePermissionInput[]


}