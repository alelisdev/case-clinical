import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateProcedureTypeInput } from './user-update-procedure-type.input'

@InputType()
export class UserUpdateProcedureTypesInput {
  @Field(() => [UserUpdateProcedureTypeInput], {nullable: true }) 
  procedureTypes: UserUpdateProcedureTypeInput[]
}
