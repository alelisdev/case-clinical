import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePriorAuthorizationRequestInput } from './user-update-prior-authorization-request.input'

@InputType()
export class UserUpdatePriorAuthorizationRequestsInput {
  @Field(() => [UserUpdatePriorAuthorizationRequestInput], {nullable: true }) 
  priorAuthorizationRequests: UserUpdatePriorAuthorizationRequestInput[]
}
