import { Field, ObjectType } from '@nestjs/graphql'

import { Customer } from '@case-clinical/api/customer/data-access'

import { Equipment } from '@case-clinical/api/equipment/data-access'

import { UNNumber } from '@case-clinical/api/un-number/data-access'


@ObjectType()
export class Rate {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  scqNumber?: string

  @Field({ nullable: true }) 
  cost?: number

  @Field({ nullable: true }) 
  reservationCharge?: number

  @Field({ nullable: true }) 
  effectiveDate?: Date

  @Field({ nullable: true }) 
  expirationDate?: Date

  @Field({ nullable: true}) 
  enteredDate?: Date

  @Field({ nullable: true }) 
  modifiedDate?: Date

  @Field({ nullable: true }) 
  comments?: string

  @Field({ nullable: true }) 
  paymentType?: number

  @Field({ nullable: true }) 
  version?: string

  @Field({ nullable: true }) 
  planCode?: string

  @Field({ nullable: true }) 
  discriminator?: string

  @Field({ nullable: true }) 
  equipmentId?: string

  @Field({ nullable: true }) 
  routingId?: string

  @Field({ nullable: true }) 
  stccId?: string

  @Field({ nullable: true }) 
  unNumberId?: string

  @Field({ nullable: true }) 
  modifiedByUserId?: string

  @Field({ nullable: true }) 
  enteredByUserId?: string

  @Field({ nullable: true }) 
  receiverCustomerId?: string

  @Field({ nullable: true }) 
  shipperCustomerId?: string


  @Field(() => Customer, { nullable: true }) 
  shipperCustomer?: Customer  

  @Field(() => Customer, { nullable: true }) 
  receiverCustomer?: Customer  

  @Field(() => Equipment, { nullable: true }) 
  equipment?: Equipment  

  @Field(() => UNNumber, { nullable: true }) 
  unNumber?: UNNumber  

}
