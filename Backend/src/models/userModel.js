class UserModel {
    constructor(user) {
        this.name = user.name;
        this.email = user.email;
        this.phone_number = user.phone_number; // Fix this line
        this.password = user.password;
        this.organization_name = user.organization_name;
        this.street_address = user.street_address;
        this.postal_zip = user.postal_zip;
        this.city = user.city;
        this.country = user.country;
    }
}

export default UserModel;
