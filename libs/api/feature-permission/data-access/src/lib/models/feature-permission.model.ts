import { Field, ObjectType } from '@nestjs/graphql'

import { Feature } from '@case-clinical/api/feature/data-access'

import { Permission } from '@case-clinical/api/permission/data-access'
import { UserFeaturePermission } from '@case-clinical/api/user-feature-permission/data-access' 


@ObjectType()
export class FeaturePermission {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  featureId?: string

  @Field({ nullable: true }) 
  permissionId?: string

  @Field(() => [UserFeaturePermission], { nullable: true }) 
  userFeaturePermissions?: UserFeaturePermission[]


  @Field(() => Feature, { nullable: true }) 
  feature?: Feature  

  @Field(() => Permission, { nullable: true }) 
  permission?: Permission  

}
