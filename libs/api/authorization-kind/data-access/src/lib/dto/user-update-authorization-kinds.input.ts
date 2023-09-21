import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAuthorizationKindInput } from './user-update-authorization-kind.input'

@InputType()
export class UserUpdateAuthorizationKindsInput {
  @Field(() => [UserUpdateAuthorizationKindInput], {nullable: true }) 
  authorizationKinds: UserUpdateAuthorizationKindInput[]
}
