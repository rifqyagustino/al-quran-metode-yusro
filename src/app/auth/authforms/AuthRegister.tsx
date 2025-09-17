import { Button, Label, TextInput } from "flowbite-react";
// import Link from "next/link";
import React from "react";

const AuthRegister = () => {
  return (
    <>
      <form>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Nama" />
          </div>
          <TextInput
            id="name"
            type="text"
            sizing="md"
            className="form-control form-rounded-xl"
          />
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="text"
            sizing="md"
            className="form-control form-rounded-xl"
          />
        </div>
        <div className="mb-6">
          <div className="mb-2 block">
            <Label htmlFor="userpwd" value="Password" />
          </div>
          <TextInput
            id="userpwd"
            type="password"
            sizing="md"
            className="form-control form-rounded-xl"
          />
        </div>
        <Button color={"primary"} className="w-full">
          Register
        </Button>
      </form>
    </>
  );
};

export default AuthRegister;
