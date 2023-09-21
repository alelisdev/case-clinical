import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class TenantInput {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  code?: string



}
