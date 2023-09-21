import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class RoleFeatureInput {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  featureId?: string

  @Field({ nullable: true })
  roleId?: string
}
