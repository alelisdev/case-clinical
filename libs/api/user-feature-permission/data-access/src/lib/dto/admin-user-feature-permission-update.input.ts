import { Field,InputType } from '@nestjs/graphql'

@InputType()
export class AdminUserFeaturePermissionUpdateInput {
  @Field(() => [String], { nullable: true })
  roleIds?: [string]
}
