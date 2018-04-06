import { User } from './user';
export class EmailBook {
    $key: string;
    key: string;
    userInvite: User;
    userGuest: User;
    invited: boolean;
    accepted: boolean;
    date: Date;
}
