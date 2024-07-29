"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { FormEvent, useState, useRef, useCallback, useEffect, use } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { uploadImageToFirebase } from "@/lib/utils";
import { Loader2, Loader2Icon } from "lucide-react";
import axios from "axios"
import { searchDrugsWithText } from "@/lib/actions/drug.actions";
import { getUserId } from "@/lib/actions/customer.actions";
import { FaDatabase } from "react-icons/fa6";
import Drugs from "./Drugs";
import { setPharmacyId } from "@/lib/actions/pharmacy.actions";
import { APP_ENDPOINT, EXTRACT_TEXT_ENDPOINT, GET_MEDICINE_ENDPOINT } from "@/lib/api-config";
import Webcam from "react-webcam"
import Image from "next/image";
import { createWorker } from "tesseract.js"
import { MdOutlineImageSearch } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";
import { formatMedicationText, getMedicine, preProcessText, tokenizeText } from "@/lib/validators";
import { MdOutlineCameraswitch } from "react-icons/md";


type Props = {
  pharmacyId: string;
}

export default function FileUploader({ pharmacyId }: Props) {
  const [loading, setLoading] = useState("")
  const [prescriptionText, setPrescriptionText] = useState("")
  const [prescriptionFile, setPrescriptionFile] = useState<FileList | null>(null)
  const [drugsFromDb, setDrugsFromDb] = useState<DrugsFromDBType | null>(null)
  const [capture, setCapture] = useState(false)
  const [upload, setUpload] = useState(false)
  const [base64Image, setBase64Image] = useState("")
  const [facingMode, setFacingMode] = useState("user")
  const [resultTextFromImage, setResultTextFromImage] = useState("")
  const webcamRef = useRef<any>(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    // facingMode: facingMode
    facingMode: { exact: "user" }
  };

  const submitFile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()


    // will be use in the order
    await setPharmacyId(pharmacyId)

    const fileToUpload = prescriptionFile && prescriptionFile[0]

    if (fileToUpload && fileToUpload.type !== "application/pdf") {
      toast.error("file should be a pdf")
      return
    }

    if (fileToUpload && fileToUpload.size > 10 * 1024 * 1024) {
      toast.error("file should be less than 10mb")
      return
    }

    if (!fileToUpload) {
      toast.error("please upload a prescription file")
      return
    }

    try {
      setLoading("loading")
      const file = await uploadImageToFirebase("prescription", fileToUpload)

      // EXTRACT TEXT FROM PDF
      const formData = new FormData()
      formData.append("pdfFile", fileToUpload)
      const { data } = await axios.post(EXTRACT_TEXT_ENDPOINT, formData)

      // trim the text
      const preProcessed = preProcessText(data)
    
      const tokenizedText = preProcessed.trim().split("\n")
      console.log(tokenizedText)
      // search text through db 
      const drugs = JSON.parse(await searchDrugsWithText(tokenizedText) as string) as DrugsFromDBType
      setDrugsFromDb(drugs)
      setLoading("done")
      toast.success("file uploaded successfully!")
    } catch (error) {
      console.error(error)
      toast.error("something unexpected happened, please try again")
      setLoading("")
    }
  }

  const handleCapture = async () => {
      try {
        setLoading("loading")

        // extracting text from screenshot
        const imageSrc = webcamRef.current?.getScreenshot();
        const worker = await createWorker('eng');
        const ret = await worker.recognize(imageSrc!);
        const extractedTextFromImage: any = ret.data.text 


        const medicines = formatMedicationText(extractedTextFromImage)
        const med = getMedicine(medicines)
        // medicines.push(medicines)
        
        // extracted text feed into an LLM
        // const { data } = await axios.post(GET_MEDICINE_ENDPOINT, { content: extractedTextFromImage })

        // searching drugs from db 
        const drugs = JSON.parse(await searchDrugsWithText(med) as string) as DrugsFromDBType


        setDrugsFromDb(drugs)
        setResultTextFromImage(ret.data.text)
        await worker.terminate();

        setBase64Image(imageSrc!)
        setLoading("done")
        toast.success("text extracted!")
        
      } catch (error) {
        console.error(error)
        toast.error("please try again")
        setLoading("done")
      }

  }


  const toggleFacingMode = () => {
    setFacingMode(prevMode => (prevMode === "user" ? "environment" : "user"));
  };

  return (
    <section className="md:pl-6">
      <h1 className="mt-5 text-xl font-bold">Prescription file</h1>
      <section>
        <section className="flex items-center gap-2 mt-5">
          <div onClick={() => setCapture(true)}
            className="border border-blue px-5 py-2 rounded flex gap-2 cursor-pointer shadow-md">
            <FaCamera className="text-blue" fontSize={21} />
            <span className="text-gray-1">Capture</span>
          </div>
          <div onClick={() => setUpload(true)}
            className="border border-blue px-5 py-2 rounded flex gap-2 cursor-pointer shadow-md">
           <MdFileUpload className="text-blue" fontSize={23} />
           <span className="text-gray-1">Upload</span>
          </div>
        </section>

        <section className="w-full flex flex-col md:flex-row justify-between gap-3 mt-10">
         <div className="w-[50%] rounded">
           {capture && (
           <>
            <span className="text-xs text-red-500 leading-4">**for high accuracy, camera should be close to the prescription form**</span>
            <Webcam
              audio={false}
              height={300}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
              videoConstraints={videoConstraints}
            />
            <div className="flex flex-row items-center gap-3">
             <Button className="bg-blue text-white
              hover:bg-blue active:bg-blue mt-2 rounded"
              disabled={loading === "loading"}
              onClick={handleCapture}>
               {loading === "loading" && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
               Take photo
             </Button>
             <p>
              <MdOutlineCameraswitch
               fontSize={21}
               className="text-white cursor-pointer"
               onClick={toggleFacingMode}
              />
             </p>
            </div>
           </>
           )}
         </div>

         <div className="w-[50%] hidden md:flex rounded">
          {base64Image && (
           <Image
            src={base64Image!}
            alt="image"
            width={300}
            height={300}
            className="object-cover"
           />
          )}
         </div>
        </section>
      </section>


      <form onSubmit={submitFile}>
        {upload && (
          <>
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-0 md:mt-4">
          <p className="text-sm italic">upload a prescription file</p>
          <Input
            id="prescription_file"
            type="file"
            className="border border-[#ccc] bg-input-bg rounded file:text-blue
            cursor-pointer"
            onChange={(event) => setPrescriptionFile(event.target.files)}
            accept="application/pdf"
          />
        </div>
        <Button
          type="submit"
          className="w-full md:w-1/2 bg-blue hover:bg-blue active:bg-blue rounded mt-5 text-white"
          disabled={loading === "loading"}
        >
          {loading === "loading" && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
          Submit
        </Button>
        </>
        )}
      </form>

      <section>
        {drugsFromDb && (
          <Drugs drugsInfo={drugsFromDb} />
        )}
      </section>
    </section>
  )
}
