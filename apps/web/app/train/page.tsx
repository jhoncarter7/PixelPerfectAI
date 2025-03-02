// import * as React from "react";
"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UploadModel } from "@/components/ui/upload";
import { useState } from "react";
import {TrainModelInput} from "common/inferred"
import axios from "axios";
import { BACKEND_URL } from "../config";
import {  useRouter } from "next/navigation";
function Train() {
  const [zipUrl, setZipUrl] = useState("");
  const [type, setType] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [bald, setBald] = useState(false);
  const [ethnicity, setEthnicity] = useState("");
  // i dont want to set default value 0 
  const [age, setAge] = useState<number | undefined>(undefined);
  const [name, setName] = useState("");
  const router = useRouter();


  async function TrainModel (){

    const input: TrainModelInput = {
      zipUrl: zipUrl,
      type: type as "Man" | "Woman" | "Other",
      eyeColor: eyeColor as "Brown" | "Blue" | "Hazel" | "Gray",
      bald: bald,
      ethnicity: ethnicity as "White" | "Black" | "Asian_American" | "East_Asian" | "South_East_Asian" | "South_Asian" | "Middle_Eastern" | "Pacific" | "Hispanic",
      age: age || 0, // Provide default value to avoid undefined
      name: name || "", // Provide default value to avoid undefined
    }
    const response = await axios.post(`${BACKEND_URL}/ai/training`, input)
    router.push("/")
   }





  return (
    // make this fit on screen

    <div className="flex bg-background justify-center items-center py-10">
      <Card className="w-[350px] ">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" >Type</Label>
              <Select onValueChange={(value) => setType(value)}>
                <SelectTrigger id="name">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Man">Man</SelectItem>
                  <SelectItem value="Woman">Woman</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Ethnicity</Label>
              <Select onValueChange={(value) => setEthnicity(value)}>
                <SelectTrigger id="name">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="Asian_American">Asian_American</SelectItem>
                  <SelectItem value=" East_Asian"> East_Asian</SelectItem>
                  <SelectItem value="South_East_Asian">
                    South_East_Asian
                  </SelectItem>
                  <SelectItem value=" South_Asian "> South_Asian </SelectItem>
                  <SelectItem value="Middle_Eastern">Middle_Eastern</SelectItem>
                  <SelectItem value="Pacific">Pacific</SelectItem>
                  <SelectItem value="Hispanic">Hispanic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="age">Age</Label>
              <Input id="age" type="number" placeholder="Age of the person" value={age} onChange={(e) => setAge(Number(e.target.value))} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Eye Color</Label>

              <Select onValueChange={(value) => setEyeColor(value)}>
                <SelectTrigger id="name">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Brown">Brown</SelectItem>
                  <SelectItem value="Blue">Blue</SelectItem>
                  <SelectItem value="Green">Green</SelectItem>
                  <SelectItem value="Hazel">Hazel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Bald</Label>
              <Switch checked={bald}  onClick={() => setBald(!bald)}  />
            </div>
           <div>
           <UploadModel onUploadDone={(zipUrl: string)=> setZipUrl(zipUrl)}/>
           </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/")} >Cancel</Button>
          <Button
          disabled={!zipUrl || !type || !eyeColor || !ethnicity || !age || !name}
          onClick={TrainModel}>Create Model</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Train;
