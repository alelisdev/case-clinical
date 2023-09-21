import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateLeadInput } from './user-update-lead.input'

@InputType()
export class UserUpdateLeadsInput {
  @Field(() => [UserUpdateLeadInput], {nullable: true }) 
  leads: UserUpdateLeadInput[]
}
