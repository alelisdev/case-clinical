import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateProcedureStatusInput } from './user-update-procedure-status.input'

@InputType()
export class UserUpdateProcedureStatusesInput {
  @Field(() => [UserUpdateProcedureStatusInput], {nullable: true })
  procedureStatuses: UserUpdateProcedureStatusInput[]
}
