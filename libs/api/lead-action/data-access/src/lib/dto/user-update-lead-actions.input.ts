import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateLeadActionInput } from './user-update-lead-action.input'

@InputType()
export class UserUpdateLeadActionsInput {
  @Field(() => [UserUpdateLeadActionInput], {nullable: true }) 
  leadActions: UserUpdateLeadActionInput[]
}
