import { Nullable } from "../../Common/Types";

export type Role =
'User' |
'Admin' |
'Moderator' |
'Prefect' |
'Banned'

export const localizeRole = (role: Role): Nullable<string> => {
  switch (role) {
    case 'Admin':
      return 'Администратор';
    case 'User':
      return 'Пользователь';
    case 'Moderator':
      return 'Модератор';
    case 'Prefect':
      return 'Префект';
    case 'Banned':
      return 'Заблокированный';
  };
}