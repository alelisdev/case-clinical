import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateTenantInput {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  code?: string

}
