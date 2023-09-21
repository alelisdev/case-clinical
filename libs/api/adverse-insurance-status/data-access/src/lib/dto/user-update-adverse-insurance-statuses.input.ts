import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAdverseInsuranceStatusInput } from './user-update-adverse-insurance-status.input'

@InputType()
export class UserUpdateAdverseInsuranceStatusesInput {
  @Field(() => [UserUpdateAdverseInsuranceStatusInput], {nullable: true }) 
  adverseInsuranceStatuses: UserUpdateAdverseInsuranceStatusInput[]
}
