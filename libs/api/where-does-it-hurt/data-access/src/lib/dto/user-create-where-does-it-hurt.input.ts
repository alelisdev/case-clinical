import { Field, InputType } from '@nestjs/graphql'

import { UserCreateSideInput } from '@case-clinical/api/side/data-access'
import { UserCreateBodyPartInput } from '@case-clinical/api/body-part/data-access'
import { UserCreateWhereDoesItHurtSpecialtyInput } from '@case-clinical/api/where-does-it-hurt-specialty/data-access'
// import { UserCreateIntakeWhereDoesItHurtInput } from '@case-clinical/api/intake-where-does-it-hurt/data-access'


@InputType()
export class UserCreateWhereDoesItHurtInput {

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  sideId?: string

  @Field({ nullable: true })
  bodyPartId?: string

  @Field(() => [UserCreateWhereDoesItHurtSpecialtyInput], { nullable: true })
  whereDoesItHurtSpecialties?: UserCreateWhereDoesItHurtSpecialtyInput[]

  // @Field(() => [UserCreateIntakeWhereDoesItHurtInput], { nullable: true })
  // intakeWhereDoesItHurts?: UserCreateIntakeWhereDoesItHurtInput[]


  @Field(() => UserCreateSideInput ,{ nullable: true })
  side?: UserCreateSideInput


  @Field(() => UserCreateBodyPartInput ,{ nullable: true })
  bodyPart?: UserCreateBodyPartInput

}
