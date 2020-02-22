import { Comments } from './../comments/comments';
import { User } from './../user/user';
import { Review } from '../review/review';
export class Template {

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
    users: User[];
    commentss: Comments[];
    subTemplates: Template[];
    parentTemplates: Template[];
    rating: Review[];

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
    users?: User[],
    commentss?: Comments[],
    subTemplates?: Template[],
    parentTemplates?: Template[],
    rating?: Review[]
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
    this.users = users;
    this.commentss = commentss;
    this.subTemplates = subTemplates;
    this.parentTemplates = parentTemplates;
    this.rating = rating;
  }

}
