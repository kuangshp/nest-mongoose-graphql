### 一、初始化项目及安装一些包
* 1、官网克隆种子文件

    ```javascript
    $ git clone https://github.com/nestjs/typescript-starter.git project
    $ cd project
    $ npm install
    ```
* 2、安装`graphql`包及`mongoose`包(安装包后可能会报错,需要重新安装`ts-node`)

    ```javascript
    $ npm install --save @nestjs/mongoose mongoose
    $ npm install --save-dev @types/mongoose
    $ npm i --save @nestjs/graphql apollo-server-express graphql-tools graphql
    ```
    
### 二、基本配置
* 1、新建一个文件夹`graphql`存放`graphql-Module`的文件

    ```javascript
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
    ```
* 2、新建一个`database`文件夹存放连接`mongoose`数据库的`module`

    ```javascript
    import { Module } from '@nestjs/common';
    import { MongooseModule } from '@nestjs/mongoose';
    
    @Module({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/nest'),
      ]
    })
    
    export class DatabaseModule { }
    ```
    
* 3、创建一个`users`的文件夹(或者叫`App`)存放用户的信息

### 三、关于`users`开发的步骤
* 1、新建文件夹及文件

    ```javascript
    |-users
      |-dto
        |- create-user.dto.ts
      |-interface
        user.interface.ts
      schema
        user.schema.ts
      user.module.ts
      user.resolver.ts
      user.service.ts
      user.types.graphql
    ```
    
* 2、其中`dto`,`interface`,`schema`,`module`,`service`跟之前的一样,[可以参考](https://github.com/kuangshp/nest-mongoose)
* 3、`resolver`功能和之前的`users.controller.ts`类似(我们先往数据库里面插入一条数据)

    ```javascript
    import { Mutation, Query, Resolver } from '@nestjs/graphql';
    import { CreateUserDto } from './dto/create-user.dto';
    import { IUser } from './interface/user.interface';
    import { UserService } from './user.service';
    
    @Resolver('user')
    export class UserResolver {
      constructor(private readonly userService: UserService) { }
    
      // 创建一个用户
      @Mutation('createUser')
      public async createUser(obj: any, args: IUser, context: any, info: any):Promise<IUser> {
        return await this.userService.createUser(args);
      }
    }
    ```
* 4、在上面我们在`constructor`中注入了`UserService`调用了里面的`createUser`方法

    ```javascript
    **user.service.ts**
    import { Component } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Model } from 'mongoose';
    import { IUser } from './interface/user.interface';
    import { UserSchema } from './schema/user.schema';
    import { CreateUserDto } from './dto/create-user.dto';
    
    @Component()
    export class UserService {
      // 在constructor中使用Injetc注入UserSchema
      constructor( @InjectModel(UserSchema) private readonly userSchema: Model<IUser>) { }
    
      // 创建一个用户的
      public async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        const newUser = new this.userSchema(createUserDto);
        return await newUser.save();
      }
    }
    ```
    
* 5、书写`user.types.graphql`文件
> 注意`!`表示必填字段

    ```graphql
    type User {
      _id: String,
      name: String,
      email: String,
      age: Int,
      password: String,
      createAt: String,
      updateAt: String
    }
    
    # 定义Mutation的graphql
    type Mutation {
      createUser(name: String!, email:String!,age:Int,password:String): User,
    }
    ```
    
* 6、在`user.module.ts`中引入文件

    ```javascript
    import { Module } from '@nestjs/common';
    import { MongooseModule } from '@nestjs/mongoose';
    import { UserSchema } from './schema/user.schema';
    import { UserService } from './user.service';
    import { UserResolver } from './user.resolver';
    
    @Module({
      components: [UserService, UserResolver],
      exports: [UserResolver],
      imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])]
    })
    
    export class UserModule { }
    ```
* 7、在`app.module.ts`引入相关文件

    ```javascript
    import { Module } from '@nestjs/common';
    import { DatabaseModule } from './database/database.module';
    import { GQLModule } from './graphql/gql.module';
    import { UserModule } from './users/user.module';
    
    
    @Module({
      imports: [DatabaseModule, GQLModule, UserModule]
    })
    export class ApplicationModule { }
    
    ```


### 四、注意点
* 1、如果开始跑项目出现问题

    ```javascript
    (node:7164) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 3): TypeError: buildASTSchema.getDescription is not a function
    (node:7164) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
    ```
    
* 2、如果出现上面的错误的时候你要考虑下`npm`包版本的问题

    ```javascript
    **可以根据需要调整版本号**
    "apollo-server-express": "1.3.2",
    "graphql": "0.11.7",
    "graphql-tools": "2.18.0",
    ```
    
### 五、再写一个根据用户`id`查询出用户的
* 1、在`user.resolver.ts`书写

    ```javascript
    ...
    // 根据id查询用户
    @Query('getUserById')
    public async getUserById(obj: any, args: IUser, context: any, info: any):Promise<IUser> {
        return await this.userService.getUserById(args._id);
    }
    ...
    ```
    
* 2、在`user.service.ts`书写

    ```javascript
    ...
    // 根据id查询用户
    public async getUserById(_id: String): Promise<IUser> {
        return await this.userSchema.findById({_id}).exec();
    }
    ...
    ```
    
* 3、`user.types.graphql`文件的书写

    ```javascript
    ...
    # 定义查询的graphql
    type Query {
      getUserById(_id: String):User
    }
    ...
    ```
    
* 4、一般步骤是按照前面三点的顺序来写的

### 六、关于`graphql`文件的补充
* 1、`graphQL`官方提供的几种类型(关于复杂的结构可以参考`book`这个`app`自定义输入数据类型)

    * `Int`：有符号 32 位整数。
    * `Float`：有符号双精度浮点值。
    * `String`：`UTF‐8` 字符序列。
    * `Boolean`：`true` 或者 `false`。
    * `ID`：`ID` 标量类型表示一个唯一标识符，通常用以重新获取对象或者作为缓存中的键。`ID` 类型使用和 `String` 一样的方式序列化；然而将其定义为 `ID` 意味着并不需要人类可读型。

* 2、需要下载客户端`GraphiQL`来测试