import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePriorAuthorizationDiagnosisCodeInput } from './user-update-prior-authorization-diagnosis-code.input'

@InputType()
export class UserUpdatePriorAuthorizationDiagnosisCodesInput {
  @Field(() => [UserUpdatePriorAuthorizationDiagnosisCodeInput], {nullable: true }) 
  priorAuthorizationDiagnosisCodes: UserUpdatePriorAuthorizationDiagnosisCodeInput[]
}
