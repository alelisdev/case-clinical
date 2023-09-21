import { Field, ObjectType } from '@nestjs/graphql'

import { AccidentType } from '@case-clinical/api/accident-type/data-access'

import { MedLevel } from '@case-clinical/api/med-level/data-access'


@ObjectType()
export class RequiredField {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  entityName?: string

  @Field({ nullable: true }) 
  accidentTypeId?: string

  @Field({ nullable: true }) 
  medLevelId?: string


  @Field(() => AccidentType, { nullable: true }) 
  accidentType?: AccidentType  

  @Field(() => MedLevel, { nullable: true }) 
  medLevel?: MedLevel  

}
