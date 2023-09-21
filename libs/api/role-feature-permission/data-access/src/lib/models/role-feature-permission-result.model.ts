import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RoleFeaturePermissionUpdateResult {

  @Field({ nullable: true })
  added?: number

  @Field({ nullable: true })
  removed?: number
}
