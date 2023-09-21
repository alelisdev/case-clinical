import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateBatchControlInput } from './user-update-batch-control.input'

@InputType()
export class UserUpdateBatchControlsInput {
  @Field(() => [UserUpdateBatchControlInput], {nullable: true }) 
  batchControls: UserUpdateBatchControlInput[]
}
