import { Comment } from './../comments/comment';
import { User } from './../user/user';
import { Rating } from '../rating/rating';

export class TemplateInfo {

  // F I E L D S
  id: number;
  name: string;
  extension: string;
  content: string;
  access: boolean;
  templateType: string;
  description: string;
  instructions: string;
  user: User;
  favorites: number;
  ratings: number;

  // C O N S T R U C T O R
  constructor(
    id?: number,
    name?: string,
    extension?: string,
    content?: string,
    access?: boolean,
    templateType?: string,
    description?: string,
    instructions?: string,
    user?: User,
    favorites?: number,
    ratings?: number
  ) {
    this.id = id;
    this.name = name;
    this.extension = extension;
    this.content = content;
    this.access = access;
    this.templateType = templateType;
    this.description = description;
    this.instructions = instructions;
    this.user = user;
    this.favorites = favorites;
    this.ratings = ratings;
  }


}
