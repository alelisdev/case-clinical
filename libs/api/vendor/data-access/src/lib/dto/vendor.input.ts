import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class VendorInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  taxId?: string

  @Field({ nullable: true }) 
  line1?: string

  @Field({ nullable: true }) 
  city?: string

  @Field({ nullable: true }) 
  state?: string

  @Field({ nullable: true }) 
  postalCode?: string

  @Field({ nullable: true }) 
  emailAddress?: string

  @Field({ nullable: true }) 
  phoneNumber?: string

  @Field({ nullable: true }) 
  fax?: string

  @Field({ nullable: true }) 
  mailingAddress?: string

  @Field({ nullable: true }) 
  vendorTypeId?: string


  @Field({ nullable: true }) 
  line2?: string

  @Field({ nullable: true }) 
  country?: string

  @Field({ nullable: true }) 
  office?: string

  @Field({ nullable: true }) 
  email?: string

  @Field({ nullable: true }) 
  website?: string

  @Field({ nullable: true }) 
  contactPerson?: string

  @Field({ nullable: true }) 
  owner?: string

  @Field({ nullable: true }) 
  bankRoutingNumber?: string

  @Field({ nullable: true }) 
  bankAccountNumber?: string

  @Field({ nullable: true }) 
  bankName?: string

  @Field({ nullable: true }) 
  bankCity?: string

  @Field({ nullable: true }) 
  bankState?: string

  @Field({ nullable: true }) 
  bankZip?: string

  @Field({ nullable: true }) 
  notes?: string

  @Field({ nullable: true }) 
  agreementDetails?: string

  @Field({ nullable: true }) 
  providerSearchNameDisplayType?: string

  @Field({ nullable: true }) 
  driversLicenseId?: string


  @Field({ nullable: true }) 
  logoId?: string

  @Field({ nullable: true }) 
  cellphone?: string

  @Field({ nullable: true }) 
  achCheckOrWire?: string

  @Field({ nullable: true }) 
  reductionNotes?: string

  @Field({ nullable: true }) 
  latitude?: number

  @Field({ nullable: true }) 
  longitude?: number

  @Field({ nullable: true }) 
  businessCentralName?: string





}
