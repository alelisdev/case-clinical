import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateTenantInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  country?: string

  @Field({ nullable: true })
  logo_url?: string
}
