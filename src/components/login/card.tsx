"use client";

import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import Image from "next/image";
import { Poppins } from "next/font/google";

const logoFont = Poppins({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  display: "swap",
});

export default function CardLog() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full md:w-[800px] h-auto md:h-[500px]">
        <Card className="h-full">
          <div className="flex flex-col md:flex-row">

            {/* LADO IZQUIERDO */}
            <div className="flex flex-row md:flex-col items-center justify-center gap-4 p-6 w-full md:w-1/2 h-full">
              <div className="relative  w-24 h-24  md:w-64 md:h-64 shrink-0">
                <Image
                  src="/logo-bg.png"
                  alt="Logo readyPOS"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <h1
                className={`${logoFont.className} text-3xl font-black tracking-tight select-none text-[#924f9f] text-center`}
              >
                ready <span className="font-bold text-[#23b1af]">POS</span>
              </h1>
            </div>

            {/* DIVIDER */}
            <div className="hidden md:block w-px bg-gray-300 self-stretch mt-8"></div>

            {/* LADO DERECHO */}
            <div className="flex flex-col justify-center md:mt-8 md:gap-8 px-8 w-full md:w-1/2 h-full">

              <div className="text-center">
                <h2 className="text-2xl font-semibold">Bienvenid@</h2>
                <p className="text-sm text-gray-500">
                  Iniciá sesión en tu cuenta
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 mt-4">
                  <label htmlFor="username" className="text-sm font-medium">
                    Usuario
                  </label>
                  <InputText
                    id="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-1"
                  />
                </div>

                <div className="flex flex-col gap-1 md:mt-8">
                  <label htmlFor="password" className="text-sm font-medium">
                    Contraseña
                  </label>
                  <Password
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    toggleMask
                    feedback={false}
                    className="w-full h-full"
                    inputClassName="w-84 h-full border border-gray-300 rounded-md py-1.5"
                  />
                </div>
              </div>

              <button className="w-full bg-[#23b1af] text-white py-2 rounded-md font-semibold hover:opacity-90 transition mt-8 mb-8 md:mt-8">
                Iniciar sesión
              </button>

            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
