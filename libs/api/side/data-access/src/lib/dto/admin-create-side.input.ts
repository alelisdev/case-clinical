import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateWhereDoesItHurtInput } from '@case-clinical/api/where-does-it-hurt/data-access'
// import { AdminCreateClinicalFindingInput } from '@case-clinical/api/clinical-finding/data-access'


@InputType()
export class AdminCreateSideInput {

  @Field({ nullable: true })
  name?: string

  @Field(() => [AdminCreateWhereDoesItHurtInput], { nullable: true })
  whereDoesItHurts?: AdminCreateWhereDoesItHurtInput[]

  // @Field(() => [AdminCreateClinicalFindingInput], { nullable: true })
  // clinicalFindings?: AdminCreateClinicalFindingInput[]


}
