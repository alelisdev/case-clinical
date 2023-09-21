import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateLeadSourceInput } from './user-update-lead-source.input'

@InputType()
export class UserUpdateLeadSourcesInput {
  @Field(() => [UserUpdateLeadSourceInput], {nullable: true }) 
  leadSources: UserUpdateLeadSourceInput[]
}
