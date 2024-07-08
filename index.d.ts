type createPatientParams = {
    name: string;
    email: string;
    address: string;
    contact: string;
    location: string;
    authId: string;
}

type PharmacyParams = {
    _id: string;
    name: string;
    description: string;
    location: string;
    image: string;
    working_hours: string;
    drugs: string[]
}

type DrugType = {
    _id: string;
    category: string;
    description: string;
    expiry_date: string;
    image: string;
    name: string;
    price: string;
    require_prescription: boolean;
    stock_quantity: number;
    manufacturer_details: string;
}

type Pharmacy = {
    msg: string;
    pharmacy: {
        _id: string;
        name: string;
        email: string;
        location: string;
        address: string;
        description: string;
        drugs: [string]
        orders: [string]
        pharmacist: string; 
        working_hours: string;
    }
}