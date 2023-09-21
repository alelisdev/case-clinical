import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateWriteOffInput } from './user-update-write-off.input'

@InputType()
export class UserUpdateWriteOffsInput {
  @Field(() => [UserUpdateWriteOffInput], {nullable: true }) 
  writeOffs: UserUpdateWriteOffInput[]
}
