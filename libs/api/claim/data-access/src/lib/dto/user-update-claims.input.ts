import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateClaimInput } from './user-update-claim.input'

@InputType()
export class UserUpdateClaimsInput {
  @Field(() => [UserUpdateClaimInput], {nullable: true }) 
  claims: UserUpdateClaimInput[]
}
