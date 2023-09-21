import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateWriteOffStatusInput } from './user-update-write-off-status.input'

@InputType()
export class UserUpdateWriteOffStatusesInput {
  @Field(() => [UserUpdateWriteOffStatusInput], {nullable: true }) 
  writeOffStatuses: UserUpdateWriteOffStatusInput[]
}
