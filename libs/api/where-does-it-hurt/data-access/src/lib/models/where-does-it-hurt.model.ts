import { Field, ObjectType } from '@nestjs/graphql'

import { Side } from '@case-clinical/api/side/data-access'

import { BodyPart } from '@case-clinical/api/body-part/data-access'
import { WhereDoesItHurtSpecialty } from '@case-clinical/api/where-does-it-hurt-specialty/data-access'
// import { IntakeWhereDoesItHurt } from '@case-clinical/api/intake-where-does-it-hurt/data-access'


@ObjectType()
export class WhereDoesItHurt {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  sideId?: string

  @Field({ nullable: true })
  bodyPartId?: string

  @Field(() => [WhereDoesItHurtSpecialty], { nullable: true })
  whereDoesItHurtSpecialties?: WhereDoesItHurtSpecialty[]

  // @Field(() => [IntakeWhereDoesItHurt], { nullable: true })
  // // intakeWhereDoesItHurts?: IntakeWhereDoesItHurt[]


  @Field(() => Side, { nullable: true })
  side?: Side

  @Field(() => BodyPart, { nullable: true })
  bodyPart?: BodyPart

}
