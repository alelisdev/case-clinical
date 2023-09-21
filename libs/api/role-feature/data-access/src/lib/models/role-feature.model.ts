import { Field, ObjectType } from '@nestjs/graphql'

import { Feature } from '@case-clinical/api/feature/data-access'

import { Role } from '@case-clinical/api/role/data-access'


@ObjectType()
export class RoleFeature {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  featureId?: string

  @Field({ nullable: true })
  roleId?: string

  @Field(() => Feature, { nullable: true })
  feature?: Feature

  @Field(() => Role, { nullable: true })
  role?: Role

}
