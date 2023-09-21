import { Scalar, CustomScalar } from '@nestjs/graphql'
import { Kind, ValueNode } from 'graphql'

@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type'

  parseValue(value: string): Date {
    return new Date(value) // value from the client
  }

  serialize(value: Date): string { 
    
    var isoDateTime = value.toISOString().replace('Z', '')

    // if (isoDateTime.includes('T')) {
    //   isoDateTime = isoDateTime.split('T')[0]
    // }
    return isoDateTime
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value)
    }
    return null
  }
}

// @Scalar('DateTime', (type) => Date)
// export class DateTimeScalar implements CustomScalar<string, Date> {

//   description = 'Date Time custom scalar type';

//   parseValue(value: string): Date {
//       // IF LENGTH IS 10 then append

//     return new Date(value); // value from the client
//   }

//   serialize(value: Date): string {
//     var isoDateTime = new Date(value.getTime() - (value.getTimezoneOffset() * 60000)).toISOString().replace('Z', '');
//     return  isoDateTime
//   }

//   parseLiteral(ast: ValueNode): Date {
//     if (ast.kind === Kind.INT) {
//       return new Date(ast.value);
//     }
//     return null;
//   }
// }
