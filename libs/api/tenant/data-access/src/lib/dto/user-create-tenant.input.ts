import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateTenantInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  code?: string

}
