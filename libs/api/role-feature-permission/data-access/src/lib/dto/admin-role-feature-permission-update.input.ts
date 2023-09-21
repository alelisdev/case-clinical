import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminRoleFeaturePermissionUpdateInput extends CorePagingInput {
  @Field(() => [String], { nullable: true })
  featurePermissionIdsToRemove?: [string]

  @Field(() => [String], { nullable: true })
  featurePermissionIdsToAdd?: string[]

  @Field(() => [String], { nullable: true })
  featureIds?: string[]
}
