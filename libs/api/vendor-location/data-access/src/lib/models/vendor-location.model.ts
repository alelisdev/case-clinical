import { Field, ObjectType } from '@nestjs/graphql'

import { Location } from '@case-clinical/api/location/data-access'

import { Vendor } from '@case-clinical/api/vendor/data-access'


@ObjectType()
export class VendorLocation {

  @Field({ nullable: true })
  id?: string

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  vendorId?: string


  @Field(() => Vendor, { nullable: true })
  vendor?: Vendor

  @Field(() => [ Location ], { nullable: true })
  locations?: Location[]

}
