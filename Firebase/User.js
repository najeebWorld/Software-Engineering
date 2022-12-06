/**
 * Singleton user class to hold uid throughout the project.
 */
class User {
    constructor(){
        this.uid = null;
        this.isCustomer = null;
    }
    userID = (uid) =>{
        if(!uid){
            return this.uid;
        }
        this.uid = uid;
    }
    setCustomer = (flag) =>{
        if(!flag){
            return this.isCustomer;
        }
        this.isCustomer=flag;
    }
}

const instance = new User();
export default instance;