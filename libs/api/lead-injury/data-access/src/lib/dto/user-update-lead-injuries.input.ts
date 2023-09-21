import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateLeadInjuryInput } from './user-update-lead-injury.input'

@InputType()
export class UserUpdateLeadInjuriesInput {
  @Field(() => [UserUpdateLeadInjuryInput], {nullable: true }) 
  leadInjuries: UserUpdateLeadInjuryInput[]
}
