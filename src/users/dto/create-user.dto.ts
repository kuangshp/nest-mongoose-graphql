/**
 * 定义一个创建数据的模型
 */
export class CreateUserDto {
  public readonly name: String;
  public readonly email: String;
  public readonly age: Number;
  public readonly password: String;
  public readonly createAt: Date;
  public readonly updateAt: Date;
}