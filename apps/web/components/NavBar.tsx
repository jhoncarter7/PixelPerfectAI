

import React from 'react'
import BorderAnimatedButton from "@/components/ui/borderAnimatedButton";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
const NavBar = () => {
  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16 max-w-4/6 mx-auto border rounded-xl shadow-lg mt-4 ">
        <div>
          <h2>ImageAi</h2>
        </div>
        <div className="">
          <ul className="flex gap-x-2 font-bold">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Price</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
          </ul>
        </div>
        <div className="flex gap-x-2">
          <SignedOut>
            <BorderAnimatedButton>
              {" "}
              <SignInButton />
            </BorderAnimatedButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
  )
}

export default NavBar