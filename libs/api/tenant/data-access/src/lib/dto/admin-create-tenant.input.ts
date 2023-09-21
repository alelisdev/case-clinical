import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreateTenantInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  code?: string
}
