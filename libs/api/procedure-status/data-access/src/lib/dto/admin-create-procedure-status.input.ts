import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access'


@InputType()
export class AdminCreateProcedureStatusInput {

  @Field({ nullable: true })
  name?: string

  @Field(() => [AdminCreateCaseProcedureInput], { nullable: true })
  caseProcedures?: AdminCreateCaseProcedureInput[]
}
