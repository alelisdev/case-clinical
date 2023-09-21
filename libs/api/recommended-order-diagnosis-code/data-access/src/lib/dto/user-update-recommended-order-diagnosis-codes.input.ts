import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateRecommendedOrderDiagnosisCodeInput } from './user-update-recommended-order-diagnosis-code.input'

@InputType()
export class UserUpdateRecommendedOrderDiagnosisCodesInput {
  @Field(() => [UserUpdateRecommendedOrderDiagnosisCodeInput], {nullable: true }) 
  recommendedOrderDiagnosisCodes: UserUpdateRecommendedOrderDiagnosisCodeInput[]
}
