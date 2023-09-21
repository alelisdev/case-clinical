import { HttpHeaders } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ApolloClientOptions, ApolloLink, InMemoryCache, split } from '@apollo/client/core'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { environment } from '../environments/environment'

function httpToWs(path: string): string {
  return [
    // Replace 'http*' with 'ws*'
    location.protocol.replace('http', 'ws'),
    // Get the current hostname
    `//${location.hostname}`,
    // Get the current port
    `:${environment.port}`,
    // Add the path
    `${path}`,
  ].join('')
}


export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const middlewareLink = new ApolloLink((operation, next) => {
    const token = localStorage.getItem('accessToken');

    operation.setContext(context => ({
      ...context,
      headers: {
        ...context.headers,
        'Authorization': `Bearer ${token}`
      }
    }));

    return next(operation);
  })

  const urlTarget = environment.graphql_http;
  const http = httpLink.create({ uri: urlTarget })

  const ws = new WebSocketLink({
    uri: environment.graphql_ws,
    options: {
      reconnect: true
    },
  })

  let link = split(
    ({ query }) => {
      const { kind, operation }: any = getMainDefinition(query)
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    ws,
    http
  )

  link = middlewareLink.concat(link)

  return {
    link,
    cache: new InMemoryCache(),
    credentials: 'include',
    defaultOptions: { query: { fetchPolicy: 'no-cache' } },
  }
}


@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class WebCoreFeatureGraphQLModule {}
