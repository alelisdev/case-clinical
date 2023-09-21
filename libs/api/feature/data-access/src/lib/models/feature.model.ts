import { Field, ObjectType } from '@nestjs/graphql'

import { UserFeature } from '@case-clinical/api/user-feature/data-access' 
import { FeaturePermission } from '@case-clinical/api/feature-permission/data-access' 


@ObjectType()
export class Feature {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [UserFeature], { nullable: true }) 
  userFeatures?: UserFeature[]

  @Field(() => [FeaturePermission], { nullable: true }) 
  featurePermissions?: FeaturePermission[]


}
