import { type ClassValue, clsx } from "clsx"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"
import { twMerge } from "tailwind-merge"
import { v4 } from "uuid"
import moment from "moment"

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const signUpFormInitialValues = {
  name: "",
  email: "",
  address: "",
  contact: "",
  age:"",
  location: "",
  id_number: "",
}

export const registerPharmacyInitialValues = {
  name: "",
  email: "",
  license: "",
  experience_level: "",
  phone: "",
  address: "",

  pharmacy_name: "",
  pharmacy_location: "",
  working_hours: "",
  pharmacy_address: "",
  pharmacy_email: "",
  description: "",
}

export const addProductInitialValues = {
  name: "",
  image: "",
  description: "",
  category: "",
  price: "",
  require_prescription: false,
  stock_quantity: "",
  expiry_date: "",
}

export const settingsInitialValues = {
  name: "",
  location: "",
  address: "",
  email: "",
}

export const customerFormInitialValues = {
  age: "",
  location: "",
  ID: "",
  contact: "",
  address: "",
}

// maps styles 
export const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};

export const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};

export const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};

export const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
// end of map stuffs

// getting location
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const center = { lat: latitude, lng: longitude };
          console.log(center)
          resolve(center);
        },
        (error) => {
          console.error('Error getting location:', error);
          reject(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

export const uploadImageToFirebase = async (type: string, fileToUpload: any) => {
  let uploadedUrl = ""
  
  try {

    let fileRef
    
    if (type === "drugs") {
      fileRef = ref(storage, `drugs/${fileToUpload.name + v4()}`);
    } else if (type === "profile") {
      fileRef = ref(storage, `profile/${fileToUpload.name + v4()}`);
    } else if (type === "pharmacy") {
      fileRef = ref(storage, `pharmacy/${fileToUpload.name + v4()}`)
    } else if (type === "prescription") {
      fileRef = ref(storage, `prescription/${fileToUpload.name + v4()}`)
    }

    const snapshot = await uploadBytes(fileRef!, fileToUpload);

    uploadedUrl = await getDownloadURL(snapshot.ref);

  } catch (error: any) {
    throw new Error(`Error uploading file to firebase: ${error.message}`)
  }

  return uploadedUrl
}

export const getMonthsTillExpiryDate = (expiry_date: string) => {
  const expiryDate = moment(expiry_date, "YYYY-MM-DD")
  const currentDate = moment()
  const monthsUntilExpiry = Math.abs(expiryDate.diff(currentDate, "months"))

  return monthsUntilExpiry
}


const toRadians = (degrees: number): number => degrees * (Math.PI / 180);
const toDegrees = (radians: number): number => radians * (180 / Math.PI);

interface Coordinates {
  lat: number;
  lng: number;
}

const generateRandomCoordinates = (center: Coordinates, radiusInKm: number): Coordinates => {
  const { lat, lng } = center;
  const earthRadiusInKm = 6371; // Radius of the Earth in kilometers

  const randomDistance = Math.random() * radiusInKm;
  const randomAngle = Math.random() * 2 * Math.PI;

  const deltaLatitude = randomDistance / earthRadiusInKm;
  const deltaLongitude = randomDistance / (earthRadiusInKm * Math.cos(toRadians(lat)));

  const newLat = lat + toDegrees(deltaLatitude * Math.cos(randomAngle));
  const newLng = lng + toDegrees(deltaLongitude * Math.sin(randomAngle));

  return { lat: newLat, lng: newLng };
};

export const generateMultipleCoordinates = (center: Coordinates, radii: number[], count: number): Coordinates[] => {
  const coordinates: Coordinates[] = [];
  radii.forEach(radius => {
    for (let i = 0; i < count; i++) {
      coordinates.push(generateRandomCoordinates(center, radius));
    }
  });
  return coordinates;
};