import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateFeatureInput } from '@case-clinical/api/feature/data-access'
import { AdminUpdateRoleInput } from '@case-clinical/api/role/data-access'


@InputType()
export class AdminUpdateRoleFeatureInput {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  featureId?: string

  @Field({ nullable: true })
  roleId?: string


  @Field(() => AdminUpdateFeatureInput ,{ nullable: true })
  feature?: AdminUpdateFeatureInput


  @Field(() => AdminUpdateRoleInput ,{ nullable: true })
  role?: AdminUpdateRoleInput

}
