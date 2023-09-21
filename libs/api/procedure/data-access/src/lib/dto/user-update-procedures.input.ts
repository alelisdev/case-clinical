import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateProcedureInput } from './user-update-procedure.input'

@InputType()
export class UserUpdateProceduresInput {
  @Field(() => [UserUpdateProcedureInput], {nullable: true }) 
  procedures: UserUpdateProcedureInput[]
}
