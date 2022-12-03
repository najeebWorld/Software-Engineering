/**
 * Singleton user class to hold uid throughout the project.
 */
class User {
    constructor(){
        this.uid = null;
    }
    userID = (uid) =>{
        if(!uid){
            return this.uid;
        }
        this.uid = uid;
    }
}

const instance = new User();
export default instance;