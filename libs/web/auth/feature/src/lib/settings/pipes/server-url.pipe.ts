import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serverUrl'
})
export class ServerUrlPipe implements PipeTransform {
  transform(relativeUrl: string): any {
    console.log('ServerUrlPipe', relativeUrl)
    const baseApiUrl = "http://localhost:3000"
    return `${baseApiUrl}${relativeUrl}`
  }
}
