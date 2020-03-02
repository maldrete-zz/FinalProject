import { Template } from 'src/app/entities/template/template';
import { User } from '../user/user';

export class Comment {
  // fields
  id: number;
  content: string;
  createDate: string;
  user: User;
  template: Template;

  // constructor
  constructor(
    id?: number,
    content?: string,
    createDate?: string,
    user?: User,
    template?: Template
    ) {
      this.id = id;
      this.content = content;
      this.createDate = createDate;
      this.user = user;
      this.template = template;
  }

  // methods
}
