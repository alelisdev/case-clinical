import { Field, ObjectType } from '@nestjs/graphql'

import { WhereDoesItHurt } from '@case-clinical/api/where-does-it-hurt/data-access'

import { Specialty } from '@case-clinical/api/specialty/data-access'


@ObjectType()
export class WhereDoesItHurtSpecialty {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  whereDoesItHurtId?: string

  @Field({ nullable: true }) 
  specialtyId?: string

  @Field({ nullable: true }) 
  ordinal?: number

  @Field(() => WhereDoesItHurt, { nullable: true }) 
  whereDoesItHurt?: WhereDoesItHurt  

  @Field(() => Specialty, { nullable: true }) 
  specialty?: Specialty  

}
