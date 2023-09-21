import { Field, InputType } from '@nestjs/graphql'
import { UserUpdatePriorAuthorizationProcedureCodeInput } from './user-update-prior-authorization-procedure-code.input'

@InputType()
export class UserUpdatePriorAuthorizationProcedureCodesInput {
  @Field(() => [UserUpdatePriorAuthorizationProcedureCodeInput], {nullable: true }) 
  priorAuthorizationProcedureCodes: UserUpdatePriorAuthorizationProcedureCodeInput[]
}
