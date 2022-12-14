/**
 * Singleton user class to hold uid throughout the project.
 */
class User {
  constructor() {
    this.uid = null;
    this.isCustomer = null;
    this.appoinments = null;
  }
  userID = (uid) => {
    if (!uid) {
      return this.uid;
    }
    this.uid = uid;
  };
  userAppointments = (appointemnts) => {
    if (!appointemnts) {
      return this.appoinments;
    }
    this.appoinments = appointemnts;
  };
  setCustomer = (isCustomer) => {
    if (!isCustomer) {
      return this.isCustomer === "Customer";
    }
    this.isCustomer = isCustomer;
  };
}

const instance = new User();
export default instance;
