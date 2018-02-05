import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GraphQLFactory, GraphQLModule } from '@nestjs/graphql';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';

@Module({
  imports: [GraphQLModule],
})


export class GQLModule implements NestModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) { }

  // 实现NestModule接口的方法
  public configure(consumer: MiddlewaresConsumer): void | MiddlewaresConsumer {
    // 获取src子目录下全部以.graphql结尾的文件
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./src/**/*.graphql');
    // 将获取的文件生成一个schema
    const schema = this.graphQLFactory.createSchema({ typeDefs });

    // 注意第一个applay是graphiqlExpress,第二个applay是graphqlExpress
    consumer
      .apply(graphiqlExpress({ endpointURL: '/graphql' }))
      .forRoutes({ path: '/graphiql', method: RequestMethod.GET })
      .apply(graphqlExpress((req) => ({ schema, rootValue: req })))
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }
}