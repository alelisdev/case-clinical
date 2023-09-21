import { Field, InputType } from '@nestjs/graphql'

import { UserUpdateWhereDoesItHurtInput } from '@case-clinical/api/where-does-it-hurt/data-access'
// import { UserUpdateClinicalFindingInput } from '@case-clinical/api/clinical-finding/data-access'


@InputType()
export class AdminUpdateSideInput {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field(() => [UserUpdateWhereDoesItHurtInput], { nullable: true })
  whereDoesItHurts?: UserUpdateWhereDoesItHurtInput[]

  // @Field(() => [UserUpdateClinicalFindingInput], { nullable: true })
  // clinicalFindings?: UserUpdateClinicalFindingInput[]


}
