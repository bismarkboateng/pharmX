"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { uploadImageToFirebase } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import axios from "axios"
import { searchDrugsWithText } from "@/lib/actions/drug.actions";
import { getUserId } from "@/lib/actions/customer.actions";
import { FaDatabase } from "react-icons/fa6";
import Drugs from "./Drugs";
import { setPharmacyId } from "@/lib/actions/pharmacy.actions";
import { APP_ENDPOINT, EXTRACT_TEXT_ENDPOINT } from "@/lib/api-config";


type Props = {
  pharmacyId: string;
}

export default function FileUploader({ pharmacyId }: Props) {
  const [loading, setLoading] = useState("")
  const [prescriptionText, setPrescriptionText] = useState("")
  const [prescriptionFile, setPrescriptionFile] = useState<FileList | null>(null)
  const [drugsFromDb, setDrugsFromDb] = useState<DrugsFromDBType | null>(null)

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

    if(!fileToUpload) {
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
        const actualText = data 

        // checking file validity
        const regex = /pharm-x-[A-Za-z0-9]{8}/g
        const matches = data.match(regex)

        if (matches) {
          // call a route handler with the match passed as a param
          const { data } = await axios.get(`${APP_ENDPOINT}/api/check-file?match=${matches}`)
          if (typeof data === "boolean") {
            const arrayOfDrugs = actualText.trim().split("\n")
            const drugs = JSON.parse(await searchDrugsWithText(arrayOfDrugs) as string) as DrugsFromDBType
    
            setDrugsFromDb(drugs)
            setLoading("done")
            toast.success("file uploaded successfully!")
          } else {
            toast.error("file invalid")
            setLoading("")
            return
          }
        } else {
          toast.error("file is not valid")
          setLoading("")
          return
        }
    } catch (error) {
        console.error(error)
        toast.error("something unexpected happened, please try again")
        setLoading("")
    } 
  }


  return (
    <section>
      <form onSubmit={submitFile}>
       <div className="grid w-full max-w-sm items-center gap-1.5 mt-0 md:mt-10 md:pl-7">
        <Label htmlFor="prescription_file" className="text-lg font-bold">Prescription file</Label>
        <p className="text-sm italic">upload a prescription file</p>
        <Input
         id="prescription_file"
         type="file"
         className="border border-dark-500 bg-dark-400 rounded file:text-blue-600"
         onChange={(event) => setPrescriptionFile(event.target.files)}
         accept="application/pdf"
        />
       </div>
       <Button
        type="submit"
        className="w-full md:w-1/2 bg-blue-600 hover:bg-blue-600 active:bg-blue-600 rounded mt-5 md:ml-7
        text-white"
        disabled={loading === "loading"}
       >
        { loading === "loading" && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
        Submit
       </Button>
      </form>

      <section>
       {drugsFromDb && (
        <Drugs drugsInfo={drugsFromDb} />
       )}
      </section>
    </section>
  )
}
