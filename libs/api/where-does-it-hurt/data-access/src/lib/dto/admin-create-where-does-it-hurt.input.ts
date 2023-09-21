import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateSideInput } from '@case-clinical/api/side/data-access'
import { AdminCreateBodyPartInput } from '@case-clinical/api/body-part/data-access'
import { AdminCreateWhereDoesItHurtSpecialtyInput } from '@case-clinical/api/where-does-it-hurt-specialty/data-access'
// import { AdminCreateIntakeWhereDoesItHurtInput } from '@case-clinical/api/intake-where-does-it-hurt/data-access'


@InputType()
export class AdminCreateWhereDoesItHurtInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  sideId?: string

  @Field({ nullable: true })
  bodyPartId?: string

  @Field(() => [AdminCreateWhereDoesItHurtSpecialtyInput], { nullable: true })
  whereDoesItHurtSpecialties?: AdminCreateWhereDoesItHurtSpecialtyInput[]

  // @Field(() => [AdminCreateIntakeWhereDoesItHurtInput], { nullable: true })
  // intakeWhereDoesItHurts?: AdminCreateIntakeWhereDoesItHurtInput[]


  @Field(() => AdminCreateSideInput ,{ nullable: true })
  side?: AdminCreateSideInput


  @Field(() => AdminCreateBodyPartInput ,{ nullable: true })
  bodyPart?: AdminCreateBodyPartInput

}
