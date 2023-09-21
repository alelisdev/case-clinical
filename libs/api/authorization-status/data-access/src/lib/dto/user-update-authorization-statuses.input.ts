import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAuthorizationStatusInput } from './user-update-authorization-status.input'

@InputType()
export class UserUpdateAuthorizationStatusesInput {
  @Field(() => [UserUpdateAuthorizationStatusInput], {nullable: true }) 
  authorizationStatuses: UserUpdateAuthorizationStatusInput[]
}
