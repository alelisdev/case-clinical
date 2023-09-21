import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateCasePreProcedureInput } from './user-update-case-pre-procedure.input'

@InputType()
export class UserUpdateCasePreProceduresInput {
  @Field(() => [UserUpdateCasePreProcedureInput], {nullable: true }) 
  casePreProcedures: UserUpdateCasePreProcedureInput[]
}
