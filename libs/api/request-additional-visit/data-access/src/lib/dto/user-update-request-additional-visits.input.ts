import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateRequestAdditionalVisitInput } from './user-update-request-additional-visit.input'

@InputType()
export class UserUpdateRequestAdditionalVisitsInput {
  @Field(() => [UserUpdateRequestAdditionalVisitInput], {nullable: true }) 
  requestAdditionalVisits: UserUpdateRequestAdditionalVisitInput[]
}
