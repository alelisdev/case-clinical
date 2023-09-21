import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateCaseProcedureInput } from './user-update-case-procedure.input'

@InputType()
export class UserUpdateCaseProceduresInput {
  @Field(() => [UserUpdateCaseProcedureInput], {nullable: true }) 
  caseProcedures: UserUpdateCaseProcedureInput[]
}
