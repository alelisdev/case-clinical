import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateProcedureOrTreatmentRequestInput } from './user-update-procedure-or-treatment-request.input'

@InputType()
export class UserUpdateProcedureOrTreatmentRequestsInput {
  @Field(() => [UserUpdateProcedureOrTreatmentRequestInput], {nullable: true }) 
  procedureOrTreatmentRequests: UserUpdateProcedureOrTreatmentRequestInput[]
}
