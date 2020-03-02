import { Rating } from "./../rating/rating";
import { Template } from "../template/template";

export class User {
  // F I E L D S
  id: number;
  username: string;
  password: string;
  enabled: boolean;
  email: string;
  organizationName: string;
  role: string;
  templates: Template[];
  favorites: Template[];
  commentss: Comment[];
  rating: Rating[];

  // C O N S T R U C T O R
  constructor(
    id?: number,
    username?: string,
    password?: string,
    enabled?: boolean,
    email: string = "",
    organizationName?: string,
    role?: string,
    templates?: Template[],
    favorites?: Template[],
    commentss?: Comment[],
    rating?: Rating[]
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.enabled = enabled;
    this.email = email;
    this.organizationName = organizationName;
    this.role = role;
    this.templates = templates;
    this.favorites = favorites;
    this.commentss = commentss;
    this.rating = rating;
  }


}
