export class TokenModel {
    static currentToken: string;

    static setCurrentToken(token: string) {
        TokenModel.currentToken = token;
    }

    static deleteCurrentToken() {
        TokenModel.currentToken = "";
    }
}
