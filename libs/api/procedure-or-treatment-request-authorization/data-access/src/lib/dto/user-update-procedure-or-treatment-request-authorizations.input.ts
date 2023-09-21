import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateProcedureOrTreatmentRequestAuthorizationInput } from './user-update-procedure-or-treatment-request-authorization.input'

@InputType()
export class UserUpdateProcedureOrTreatmentRequestAuthorizationsInput {
  @Field(() => [UserUpdateProcedureOrTreatmentRequestAuthorizationInput], {nullable: true }) 
  procedureOrTreatmentRequestAuthorizations: UserUpdateProcedureOrTreatmentRequestAuthorizationInput[]
}
