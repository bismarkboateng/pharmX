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
    name: string;
    image: string;
    description: string;
    category: string;
    price: string;
    expiry_date: string;
    require_prescription: boolean;
    stock_quantity: number;
    manufacturer_details: string;
}

type Pharmacy = {
    msg: string;
    pharmacy: {
        _id: string;
        name: string;
        description: string;
        location: string;
        address: string;
        email: string;
        drugs: [string]
        working_hours: string;
        pharmacist: string;
        orders: [string]
    }
}

type Pharmacies = {
    msg: string;
    pharmacies: {
        _id: string;
        name: string;
        description: string;
        location: string;
        address: string;
        email: string;
        drugs: [];
        working_hours: string;
        pharmacist: string;
        orders: [];
    }[],
}

type Customer = {
    msg: string;
    customer: {
        ID: string;
        address: string;
        age: string;
        contact: string;
        email: string;
        image: string;
        location: string;
        name: string;
        onboarded: boolean;
        prescription: any[];
        __v: number;
        _id: string;
    };
};


type DrugsFromDBType = {
    msg: string;
    drugs: {
        category: string;
        description: string;
        expiry_date: string;
        image: string;
        name: string;
        pharmacy: string;
        price: string;
        require_prescription: boolean;
        stock_quantity: number;
        __v: number;
        _id: string;
    }[]
}

type DrugDetailFromDBType = {
    msg: string;
    drug: {
        category: string;
        description: string;
        expiry_date: string;
        image: string;
        name: string;
        pharmacy: string;
        price: string;
        require_prescription: boolean;
        stock_quantity: number;
        __v: number;
        _id: string;
    }
}


type CustomerResponse = {
    msg: string;
    customer: {
        age: string;
        id_number: string;
        location: string;
        prescription: string[]; 
        user: string;
        _id: string;
    }
}

type SignInUserFromDB = {
    isExist: boolean;
    user: {
        _id: string;
        name: string;
        email: string;
        address: string;
        contact: string;
        role: string;
    }
}

type OrdersFromDB = {
    msg: string;
    orders: {
        _id: string;
        customer: string;
        pharmacy: string;
        drugs: string[];
        status: string;
        createdAt: string;
        updatedAt: string;
        orderId?: string;

    }[]
}
