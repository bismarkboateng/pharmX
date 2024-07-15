"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { uploadImageToFirebase } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import axios from "axios"


export default function FileUploader() {
  const [loading, setLoading] = useState("")
  const [prescriptionText, setPrescriptionText] = useState("")
  const [prescriptionFile, setPrescriptionFile] = useState<FileList | null>(null)

  const submitFile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

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
        console.log("before extracting")

        // EXTRACT TEXT FROM PDF
        const formData = new FormData()
        formData.append("pdfFile", fileToUpload)
        const { data } = await axios.post("http://localhost:4000/extract-text", formData)
        console.log(data)

        setLoading("done")
        toast.success("file uploaded successfully!")
    } catch (error) {
        toast.error("something unexpected happened, please try again")
        setLoading("")
    } 
  }


  return (
    <section>
      <form onSubmit={submitFile}>
       <div className="grid w-full max-w-sm items-center gap-1.5 mt-10 pl-7">
        <Label htmlFor="prescription_file" className="text-lg font-bold">Prescription file</Label>
        <p className="text-sm italic">upload a prescription file</p>
        <Input
         id="prescription_file"
         type="file"
         className="account-form_input rounded file:text-blue-600"
         onChange={(event) => setPrescriptionFile(event.target.files)}
         accept="application/pdf"
        />
       </div>
       <Button
        type="submit"
        className="bg-blue-600 hover:bg-blue-600 active:bg-blue-600 rounded mt-5 ml-7"
        disabled={loading === "loading"}
       >
        { loading === "loading" && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
        Submit
       </Button>
      </form>
    </section>
  )
}
