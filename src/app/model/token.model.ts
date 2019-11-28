export class TokenModel {
    static currentToken: String;

    static setCurrentToken(token: String) {
        TokenModel.currentToken = token;
    }

    static deleteCurrentToken() {
        TokenModel.currentToken = "";
    }
}
