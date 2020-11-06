export interface TokenInterface {
    user: {
        _id: string;
        username: string;
        password: string;
        heroId: number;
        heroName: string;
        __v: number
    };
}