import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserFeaturePermissionUpdateResult {

  @Field({ nullable: true })
  featureCount?: number

  @Field({ nullable: true })
  featurePermissionCount?: number
}
