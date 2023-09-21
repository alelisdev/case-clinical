import { Field, InputType } from '@nestjs/graphql'

import { UserCreateFeaturePermissionInput } from '@case-clinical/api/feature-permission/data-access' 


@InputType()
export class UserCreatePermissionInput {

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserCreateFeaturePermissionInput], { nullable: true }) 
  featurePermissions?: UserCreateFeaturePermissionInput[]


}
