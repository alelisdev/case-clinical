import { Field, ObjectType } from '@nestjs/graphql'

import { FeaturePermission } from '@case-clinical/api/feature-permission/data-access' 


@ObjectType()
export class Permission {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field(() => [FeaturePermission], { nullable: true }) 
  featurePermissions?: FeaturePermission[]


}
