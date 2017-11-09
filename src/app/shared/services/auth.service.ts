export class AuthService {
    private isLogin: boolean = false;

    login(){
        this.isLogin = true;
    }

    logout(){
        this.isLogin = false;
        window.localStorage.clear();
    }
     isloggedIn(): boolean{
        return this.isLogin
     }
}