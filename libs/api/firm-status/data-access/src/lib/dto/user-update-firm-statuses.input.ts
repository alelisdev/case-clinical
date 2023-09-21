import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateFirmStatusInput } from './user-update-firm-status.input'

@InputType()
export class UserUpdateFirmStatusesInput {
  @Field(() => [UserUpdateFirmStatusInput], {nullable: true }) 
  firmStatuses: UserUpdateFirmStatusInput[]
}
