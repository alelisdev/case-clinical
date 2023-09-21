import { Field, ObjectType } from '@nestjs/graphql'

import { FeaturePermission } from '@case-clinical/api/feature-permission/data-access'

import { Role } from '@case-clinical/api/role/data-access'


@ObjectType()
export class RoleFeaturePermission {

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
  roleId?: string


  @Field(() => FeaturePermission, { nullable: true }) 
  featurePermission?: FeaturePermission  

  @Field(() => Role, { nullable: true }) 
  role?: Role  

}
