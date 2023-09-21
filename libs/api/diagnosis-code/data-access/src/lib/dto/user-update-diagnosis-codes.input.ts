import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateDiagnosisCodeInput } from './user-update-diagnosis-code.input'

@InputType()
export class UserUpdateDiagnosisCodesInput {
  @Field(() => [UserUpdateDiagnosisCodeInput], {nullable: true }) 
  diagnosisCodes: UserUpdateDiagnosisCodeInput[]
}
