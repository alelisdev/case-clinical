import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateBodyPartLeadInput } from './user-update-body-part-lead.input'

@InputType()
export class UserUpdateBodyPartLeadsInput {
  @Field(() => [UserUpdateBodyPartLeadInput], {nullable: true }) 
  bodyPartLeads: UserUpdateBodyPartLeadInput[]
}
