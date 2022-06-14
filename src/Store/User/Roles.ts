import { Nullable } from "../../Common/Types";

export type Role =
'User' |
'Admin' |
'Moderator' |
'Prefect' |
'Banned'

export const localizeRole = (role: Role): Nullable<string> => {
  let localizedRole: string | undefined = undefined;
  switch (role) {
    case 'Admin':
      localizedRole = 'Администратор';
      break;
    case 'User':
      localizedRole = 'Пользователь';
      break;
    case 'Moderator':
      localizedRole = 'Модератор';
      break;
    case 'Prefect':
      localizedRole = 'Префект';
      break;
    case 'Banned':
      localizedRole = 'Заблокированный';
      break;
  };
  return localizedRole;
}