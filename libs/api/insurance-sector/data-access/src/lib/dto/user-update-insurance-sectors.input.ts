import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateInsuranceSectorInput } from './user-update-insurance-sector.input'

@InputType()
export class UserUpdateInsuranceSectorsInput {
  @Field(() => [UserUpdateInsuranceSectorInput], {nullable: true }) 
  insuranceSectors: UserUpdateInsuranceSectorInput[]
}
