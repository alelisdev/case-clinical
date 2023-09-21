import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateSideInput } from '@case-clinical/api/side/data-access'
import { AdminUpdateBodyPartInput } from '@case-clinical/api/body-part/data-access'
import { UserUpdateWhereDoesItHurtSpecialtyInput } from '@case-clinical/api/where-does-it-hurt-specialty/data-access'
// import { UserUpdateIntakeWhereDoesItHurtInput } from '@case-clinical/api/intake-where-does-it-hurt/data-access'


@InputType()
export class AdminUpdateWhereDoesItHurtInput {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  sideId?: string

  @Field({ nullable: true })
  bodyPartId?: string

  @Field(() => [UserUpdateWhereDoesItHurtSpecialtyInput], { nullable: true })
  whereDoesItHurtSpecialties?: UserUpdateWhereDoesItHurtSpecialtyInput[]

  // @Field(() => [UserUpdateIntakeWhereDoesItHurtInput], { nullable: true })
  // intakeWhereDoesItHurts?: UserUpdateIntakeWhereDoesItHurtInput[]


  @Field(() => AdminUpdateSideInput ,{ nullable: true })
  side?: AdminUpdateSideInput


  @Field(() => AdminUpdateBodyPartInput ,{ nullable: true })
  bodyPart?: AdminUpdateBodyPartInput

}
