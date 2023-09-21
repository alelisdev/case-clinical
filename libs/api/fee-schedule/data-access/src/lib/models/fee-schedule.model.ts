import { Field, ObjectType } from '@nestjs/graphql'

import { Organization } from '@case-clinical/api/organization/data-access'

import { Specialty } from '@case-clinical/api/specialty/data-access'


@ObjectType()
export class FeeSchedule {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  organizationId?: string

  @Field({ nullable: true }) 
  specialtyId?: string

  @Field({ nullable: true }) 
  code?: string

  @Field({ nullable: true }) 
  modifier?: string

  @Field({ nullable: true }) 
  description?: string

  @Field({ nullable: true }) 
  medicarePhysicianNonFacilityRate?: number

  @Field({ nullable: true }) 
  physicianNonFacilityFee?: number

  @Field({ nullable: true }) 
  medicarePhysicianFacilityRate?: number

  @Field({ nullable: true }) 
  physicianFacilityFee?: number

  @Field({ nullable: true }) 
  baseUnit?: string

  @Field({ nullable: true }) 
  profCf?: string


  @Field(() => Organization, { nullable: true }) 
  organization?: Organization  

  @Field(() => Specialty, { nullable: true }) 
  specialty?: Specialty  

}
