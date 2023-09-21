import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateProcessInput } from './user-update-process.input'

@InputType()
export class UserUpdateProcessesInput {
  @Field(() => [UserUpdateProcessInput], {nullable: true }) 
  processes: UserUpdateProcessInput[]
}
