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

function Train() {
  const [zipUrl, setZipUrl] = useState();
  const [type, setType] = useState();
  const [eyeColor, setEyeColor] = useState();
  const [bald, setBald] = useState();
  const [ethnicity, setEthnicity] = useState();
  const [age, setAge] = useState();

  return (
    // make this fit on screen

    <div className="flex justify-center items-center py-10">
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
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Type</Label>
              <Select>
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
              <Select>
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
              <Label htmlFor="name">Age</Label>
              <Input id="name" type="number" placeholder="Age of the person" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Eye Color</Label>

              <Select>
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
              <Switch />
            </div>
           <div>
           <UploadModel />
           </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Train;
