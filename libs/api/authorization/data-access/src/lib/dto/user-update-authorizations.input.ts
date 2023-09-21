import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAuthorizationInput } from './user-update-authorization.input'

@InputType()
export class UserUpdateAuthorizationsInput {
  @Field(() => [UserUpdateAuthorizationInput], {nullable: true }) 
  authorizations: UserUpdateAuthorizationInput[]
}
