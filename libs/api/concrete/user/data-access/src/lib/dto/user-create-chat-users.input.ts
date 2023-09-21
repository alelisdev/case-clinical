import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserCreateChatUsers {
  @Field({ nullable: false })
  userId: string

  @Field({ nullable: false })
  firstname: string

  @Field({ nullable: false })
  lastname: string

  @Field({ nullable: true })
  firmId?: string
}
