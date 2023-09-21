import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAuthorizationTypeInput } from './user-update-authorization-type.input'

@InputType()
export class UserUpdateAuthorizationTypesInput {
  @Field(() => [UserUpdateAuthorizationTypeInput], {nullable: true }) 
  authorizationTypes: UserUpdateAuthorizationTypeInput[]
}
