import { Field, ObjectType } from '@nestjs/graphql'

import { WhereDoesItHurt } from '@case-clinical/api/where-does-it-hurt/data-access'
// import { ClinicalFinding } from '@case-clinical/api/clinical-finding/data-access'


@ObjectType()
export class Side {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  name?: string

  @Field(() => [WhereDoesItHurt], { nullable: true })
  whereDoesItHurts?: WhereDoesItHurt[]

  // @Field(() => [ClinicalFinding], { nullable: true })
  // // clinicalFindings?: ClinicalFinding[]


}
