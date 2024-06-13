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