import { Field, ObjectType } from '@nestjs/graphql'

import { CaseProcedure } from '@case-clinical/api/case-procedure/data-access'


@ObjectType()
export class ProcedureStatus {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  name?: string

  @Field(() => [CaseProcedure], { nullable: true })
  procedures?: CaseProcedure[]


}
