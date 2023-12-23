export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  }
}

export interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}

export interface UserTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean
}

export interface UserTodoData {
  userId: number;
  id: number;
  title: string;
  completed: boolean
}
