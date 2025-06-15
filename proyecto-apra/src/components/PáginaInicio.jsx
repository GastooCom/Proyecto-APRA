import { useState } from "react";
import { FaInstagram, FaFacebook, FaTiktok, FaYoutube } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { FaHeadset } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";
import { SiAugmentedreality } from "react-icons/si";

export default function Home() {
  return (
    <div className="font-sans min-h-screen bg-white">
      <header className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-black" />
          <nav className="hidden md:flex gap-6 font-semibold">
            <a href="#" className="text-black hover:text-purple-700">Inicio</a>
            <a href="#" className="text-black hover:text-purple-700">Asistencia</a>
            <a href="#" className="text-black hover:text-purple-700">Permisos</a>
          </nav>
        </div>
        <div className="flex gap-4 items-center">
          <a href="#" className="border border-black px-4 py-1 rounded-md hover:bg-black hover:text-white transition">
            Iniciar sesión
          </a>
          <a href="#" className="border border-black px-4 py-1 rounded-md bg-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white">
            Registrarse
          </a>
        </div>
      </header>

      {/* Social bar */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 p-2 flex justify-end gap-4 text-white text-lg pr-6">
        <FaInstagram className="cursor-pointer" />
        <FaFacebook className="cursor-pointer" />
        <FaTiktok className="cursor-pointer" />
        <FaYoutube className="cursor-pointer" />
      </div>

      {/* Hero Section */}
      <main className="flex flex-col lg:flex-row justify-between items-center p-8">
        <div className="max-w-lg space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-black via-fuchsia-600 to-black">
            Asistencia<br/>
            Realidad<br/>
            Aumentada <MdVisibility className="inline-block"/>
          </h1>
          <p className="text-gray-700 text-sm">
            Proporcionamos asistencia experta remota mediante la realidad aumentada
            para técnicos en campo 
            </p>
          <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Más información
          </button>
        </div>
        <div className="mt-8 lg:mt-0">
          <img src="/illustration-ar.png" alt="Ilustración" className="w-full max-w-md"/>
        </div>
      </main>

      <section className="flex justify-around p-8 border-t border-gray-200">
        <div className="flex flex-col items-center">
          <SiAugmentedreality className="text-4xl text-purple-700"/>
          <span className="mt-2 font-medium">Realidad Aumentada</span>
        </div>
        <div className="flex flex-col items-center">
          <FaHeadset className="text-4xl text-gray-800"/>
          <span className="mt-2 font-medium">Soporte Técnico</span>
        </div>
        <div className="flex flex-col items-center">
          <FaComments className="text-4xl text-black"/>
          <span className="mt-2 font-medium">Comunicación</span>
        </div>
      </section>
    </div>
  );
}
