import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateFeatureInput } from '@case-clinical/api/feature/data-access'
import { AdminCreateRoleInput } from '@case-clinical/api/role/data-access'


@InputType()
export class AdminCreateRoleFeatureInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  featureId?: string

  @Field({ nullable: true })
  roleId?: string


  @Field(() => AdminCreateFeatureInput ,{ nullable: true })
  feature?: AdminCreateFeatureInput


  @Field(() => AdminCreateRoleInput ,{ nullable: true })
  role?: AdminCreateRoleInput

}
