import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateCustomerInput } from '@case-clinical/api/customer/data-access' 
import { AdminCreateEquipmentInput } from '@case-clinical/api/equipment/data-access' 
import { AdminCreateUNNumberInput } from '@case-clinical/api/un-number/data-access' 


@InputType()
export class AdminCreateRateInput {

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

  @Field({ nullable: true }) 
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


  @Field(() => AdminCreateCustomerInput ,{ nullable: true }) 
  shipperCustomer?: AdminCreateCustomerInput  


  @Field(() => AdminCreateCustomerInput ,{ nullable: true }) 
  receiverCustomer?: AdminCreateCustomerInput  


  @Field(() => AdminCreateEquipmentInput ,{ nullable: true }) 
  equipment?: AdminCreateEquipmentInput  


  @Field(() => AdminCreateUNNumberInput ,{ nullable: true }) 
  unNumber?: AdminCreateUNNumberInput  

}