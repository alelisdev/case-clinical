import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAttorneyStatusInput } from './user-update-attorney-status.input'

@InputType()
export class UserUpdateAttorneyStatusesInput {
  @Field(() => [UserUpdateAttorneyStatusInput], {nullable: true }) 
  attorneyStatuses: UserUpdateAttorneyStatusInput[]
}
