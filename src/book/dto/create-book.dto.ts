import { CreateBookListDto } from "./create-book-list.dto";
import { CreateBookInfoDto } from "./create-book-info.dto";

export class CreateBookDto {
  public readonly name: String;
  public readonly bookList: Array<CreateBookListDto>;
  public readonly info: CreateBookInfoDto;
}