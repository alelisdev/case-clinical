import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class AuthorizationInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  vendorId?: string

  @Field({ nullable: true }) 
  authorizationCategoryId?: string

  @Field({ nullable: true }) 
  authorizationTypeId?: string

  @Field({ nullable: true }) 
  requestDescription?: string

  @Field({ nullable: true }) 
  durationOrQuantity?: number

  @Field({ nullable: true }) 
  unit?: string

  @Field({ nullable: true }) 
  cptCode?: string

  @Field({ nullable: true }) 
  procedureId?: string



}
