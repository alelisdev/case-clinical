import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateAuthorizationDiagnosisCodeInput } from './user-update-authorization-diagnosis-code.input'

@InputType()
export class UserUpdateAuthorizationDiagnosisCodesInput {
  @Field(() => [UserUpdateAuthorizationDiagnosisCodeInput], {nullable: true }) 
  authorizationDiagnosisCodes: UserUpdateAuthorizationDiagnosisCodeInput[]
}
