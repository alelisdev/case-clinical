import { Field, InputType } from '@nestjs/graphql'

import { UserCreateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access'


@InputType()
export class UserCreateProcedureStatusInput {

  @Field({ nullable: true })
  name?: string

  @Field(() => [UserCreateCaseProcedureInput], { nullable: true })
  procedures?: UserCreateCaseProcedureInput[]

}
