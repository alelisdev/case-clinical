import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateRoleNavigationInput {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  icon?: string

  @Field({ nullable: true })
  link?: string
}
