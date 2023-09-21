import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access'


@InputType()
export class UserUpdateProcedureStatusInput {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field(() => [UserUpdateCaseProcedureInput], { nullable: true })
  procedures?: UserUpdateCaseProcedureInput[]


}
