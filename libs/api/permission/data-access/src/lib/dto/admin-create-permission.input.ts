import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access' 


@InputType()
export class AdminCreatePermissionInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [AdminCreateFeaturePermissionInput], { nullable: true }) 
  featurePermissions?: AdminCreateFeaturePermissionInput[]


}