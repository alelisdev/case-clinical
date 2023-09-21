import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateAccidentTypeInput } from '@case-clinical/api/accident-type/data-access' 
import { AdminCreateMedLevelInput } from '@case-clinical/api/med-level/data-access' 


@InputType()
export class AdminCreateRequiredFieldInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  entityName?: string

  @Field({ nullable: true }) 
  accidentTypeId?: string

  @Field({ nullable: true }) 
  medLevelId?: string


  @Field(() => AdminCreateAccidentTypeInput ,{ nullable: true }) 
  accidentType?: AdminCreateAccidentTypeInput  


  @Field(() => AdminCreateMedLevelInput ,{ nullable: true }) 
  medLevel?: AdminCreateMedLevelInput  

}