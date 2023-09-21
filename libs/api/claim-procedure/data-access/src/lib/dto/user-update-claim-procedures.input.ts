import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateClaimProcedureInput } from './user-update-claim-procedure.input'

@InputType()
export class UserUpdateClaimProceduresInput {
  @Field(() => [UserUpdateClaimProcedureInput], {nullable: true }) 
  claimProcedures: UserUpdateClaimProcedureInput[]
}
