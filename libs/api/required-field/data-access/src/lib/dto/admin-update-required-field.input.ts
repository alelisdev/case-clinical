import { Field, InputType } from '@nestjs/graphql'

import { AdminUpdateAccidentTypeInput } from '@case-clinical/api/accident-type/data-access' 
import { AdminUpdateMedLevelInput } from '@case-clinical/api/med-level/data-access' 


@InputType()
export class AdminUpdateRequiredFieldInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  entityName?: string

  @Field({ nullable: true }) 
  accidentTypeId?: string

  @Field({ nullable: true }) 
  medLevelId?: string


  @Field(() => AdminUpdateAccidentTypeInput ,{ nullable: true }) 
  accidentType?: AdminUpdateAccidentTypeInput  


  @Field(() => AdminUpdateMedLevelInput ,{ nullable: true }) 
  medLevel?: AdminUpdateMedLevelInput  

}