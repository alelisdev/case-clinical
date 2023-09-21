import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateClaimStatusInput } from './user-update-claim-status.input'

@InputType()
export class UserUpdateClaimStatusesInput {
  @Field(() => [UserUpdateClaimStatusInput], {nullable: true }) 
  claimStatuses: UserUpdateClaimStatusInput[]
}
