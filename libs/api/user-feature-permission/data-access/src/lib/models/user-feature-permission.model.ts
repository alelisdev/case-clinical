import { Field, ObjectType } from '@nestjs/graphql'

import { FeaturePermission } from '@case-clinical/api/feature-permission/data-access'

import { User } from '@case-clinical/api/user/data-access'


@ObjectType()
export class UserFeaturePermission {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featurePermissionId?: string

  @Field({ nullable: true }) 
  userId?: string


  @Field(() => FeaturePermission, { nullable: true }) 
  featurePermission?: FeaturePermission  

  @Field(() => User, { nullable: true }) 
  user?: User  

}
