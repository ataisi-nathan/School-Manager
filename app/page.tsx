'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    const objectData = Object.fromEntries(formData.entries());

    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectData),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      alert("Email sent successfully!");
    } else {
      alert(`Error: ${result.message ?? response.statusText}`);
    }

    // if (!response.ok) {
    //   console.error("Server error:", response.status);
    //   return;
    // }

    // const text = await response.text();
    // const data = text ? JSON.parse(text) : {};

    // console.log("Success data:", data);
  }
  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <div className="overflow-hidden min-h-screen flex-col justify-between bg-white">
      <header className="flex justify-between fixed w-screen bg-indigo-500 p-3 items-center pr-14 pl-14 space-x-4 max-md:pr-7 max-md:pl-7">
        <h1 className="text-3xl text-left font-bold font-mono text-white text-[28px]">
          <Link href="/" >School.</Link>
        </h1>
        <nav className="max-lg:hidden">
          <ul className="flex justify-around rounded space-x-12 bg-white p-1 w-[50vw] font-mono font-medium text-[18px] text-indigo-500">
            <Link href="/" className="bg-white hover:bg-indigo-500  hover:text-white hover:rounded pl-3 pr-3 pt-2 pb-2">
              <li>Home</li>
            </Link>
            <Link href="#about" className="bg-white hover:bg-indigo-500  hover:text-white hover:rounded pl-3 pr-3 pt-2 pb-2">
              <li>About</li>
            </Link>
            <Link href="#contact" className="bg-white hover:bg-indigo-500  hover:text-white hover:rounded pl-3 pr-3 pt-2 pb-2">
              <li>Contact</li>
            </Link>
            <Link href="/demo" className="bg-white hover:bg-indigo-500  hover:text-white hover:rounded pl-3 pr-3 pt-2 pb-2">
              <li>View Demo</li>
            </Link>
          </ul>
        </nav>
        <nav className="absolute  right-0 top-0 h-screen  flex flex-col items-center justify-center text-center w-[50%] lg:hidden sm:hidden" id="menu">
          <ul className="relative flex flex-col gap-5 h-screen w-full justify-center">
            <div className="lg:hidden bg-white text-indigo-500 font-bold font-mono p-3 pl-5 pr-5 rounded hover:cursor-pointer absolute top-3 right-3" onClick={handleClick}>
              <button onClick={handleClick} aria-label="Toggle menu" aria-expanded={isMenuOpen} aria-controls="menu" className="focus:outline-none zindex-50">
                {isMenuOpen ? (
                  <CloseIcon /> ) : ( <MenuIcon /> )}
              </button>
            </div>
            {isMenuOpen && (
              <div className="flex flex-col gap-5 h-screen w-full bg-white justify-center items-center">
                <Link href="/" className="text-indigo-500 font-bold font-mono text-2xl">
                  <li>Home</li>
                </Link>
                <Link href="#about" className="text-indigo-500 font-bold font-mono text-2xl">
                  <li>About</li>
                </Link>
                <Link href="#contact" className="text-indigo-500 font-bold font-mono text-2xl">
                  <li>Contact</li>
                </Link>
                <Link href="/demo" className="text-indigo-500 font-bold font-mono text-2xl">
                  <li>View Demo</li>
                </Link>
              </div>
            )}
          </ul>
        </nav>
        <nav className="lg:hidden bg-white text-indigo-500 font-bold font-mono p-3 pl-5 pr-5 rounded hover:cursor-pointer" onClick={handleClick}>
          <button onClick={handleClick} aria-label="Toggle menu" aria-expanded={isMenuOpen} aria-controls="menu" className="focus:outline-none zindex-50">
            {isMenuOpen ? (
              <CloseIcon /> ) : ( <MenuIcon /> )}
          </button>
        </nav>
        
      </header>
      <main className="font-mono flex-col items-center mt-10 m-5 -mb-5 w-screen">
        {/* Hero Section */}
        <div className="flex items-center bg-indigo-500 w-screen -ml-5 p-5 justify-center text-center mt-18">
          <div className="max-md:flex-col-reverse flex justify-between items-center space-x-10 max-md:space-x-0 bg-white w-[90%] max-md:w-full rounded">
            <section className="flex flex-col items-center justify-center p-5 text-indigo-950 w-[50%] max-md:w-full">
              <h3 className="text-4xl font-bold">Shaping the Future Through Education and Innovation</h3>
              <p className="pt-3 w-[80%] max-md:w-full">Welcome to School! We are dedicated to providing an exceptional educational experience that fosters creativity, critical thinking, and lifelong learning.</p>
              <Link href="/demo" className="bg-indigo-950 hover:bg-indigo-600 text-white font-bold py-2 px-12 mt-5 rounded">
                View Demo
              </Link>
            </section>
            <section className="w-[50%] max-md:w-full">
              <Image
                src="/Hero.jpg"
                alt="Hero Image"
                width={700}
                height={225}
                className="rounded"
              />
            </section>
          </div>
          
        </div>
        {/* Banner Section */}
        <div className="banner bg-indigo-950 text-white text-center w-screen -ml-5 py-7">
          <p className="">The School excels in providing a nurturing environment for student growth and development.</p>
        </div>
        {/* Third section */}
        <div id="about" className="max-md:flex-col w-screen bg-white text-indigo-950 -ml-5 pl-5 pr-5 pb-5 flex justify-center items-center">
          <section className="w-[30%] max-md:w-full pt-5">
            <h3 className="font-bold text-5xl max-md:text-center max-md:text-4xl">Welcome Note From Our Creator</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus voluptatum veritatis sit, ducimus ab placeat dolore vitae nemo. Sed aliquid fugit dolorem impedit, eveniet atque.</p>
            <h6 className="font-bold pl-2">Ataisi Nathan</h6>
          </section>
          <section>
            <Image 
              src="/Creator.png"
              alt="Creator Image"
              width={550}
              height={200}
            />
          </section>
        </div>
        <div className="w-screen bg-white text-indigo-950 -ml-5 pl-5 pr-5 flex justify-center items-center max-md:flex-col-reverse">
          <section>
            <Image 
              src="/Background.jpg"
              alt="Creator Image"
              width={570}
              height={200}
            />
          </section>
          <section className="w-[30%] max-md:w-full p-5">
            <h3 className="font-bold text-5xl max-md:text-center">Every Child Deserves the Best</h3>
            <p className="pt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus voluptatum veritatis sit, ducimus ab placeat dolore vitae nemo. Sed aliquid fugit dolorem impedit, eveniet atque.</p>
          </section>
        </div>
        {/* Popular Courses */}
        <div className="w-screen bg-white text-indigo-950 -ml-5 mb-20 max-md:mb-5 pl-5 pr-5 flex flex-col items-center text-center pt-15">
          <section className="flex flex-col items-center">
            <h3 className="font-bold text-5xl">Our Popular Courses</h3>
            <p className="w-[50%] max-md:w-full pt-5">We offer the best courses that integrates seamlessly into our ever changing world so you don't get left behind</p>
          </section>
          {/* Curriculum Cards */}
          <section className="flex justify-center space-x-15 max-md:space-x-0 items-center max-md:flex-col max-md:gap-5">
            <div className="w-[20%] max-md:w-full h-fit p-2 pb-5 rounded bg-gray-200">
              <Image 
                src="/Background.jpg"
                alt="Card Image"
                width={350}
                height={150}
                className="rounded-2xl w-full"
              />
              <h4 className="font-bold text-[24px]">Blockchain</h4>
              <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum suscipit maiores vitae vero rerum commodi!</p>
              <Link href="/demo" className="bg-indigo-500 hover:bg-indigo-950 hover:text-white w-full px-20 py-2 mb-7">View Demo</Link>
            </div>
            <div className="w-[20%] max-md:w-full h-fit p-2 pb-5 rounded bg-gray-200">
              <Image 
                src="/Background.jpg"
                alt="Card Image"
                width={350}
                height={150}
                className="rounded-2xl w-full"
              />
              <h4 className="font-bold text-[24px]">Data Analytics</h4>
              <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum suscipit maiores vitae vero rerum commodi!</p>
              <Link href="/demo" className="bg-indigo-500 hover:bg-indigo-950 hover:text-white w-full px-20 py-2 mb-7">View Demo</Link>
            </div>
            <div className="w-[20%] max-md:w-full h-fit p-2 pb-5 rounded bg-gray-200">
              <Image 
                src="/Background.jpg"
                alt="Card Image"
                width={350}
                height={150}
                className="rounded-2xl w-full"
              />
              <h4 className="font-bold text-[24px]">Web Development</h4>
              <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum suscipit maiores vitae vero rerum commodi!</p>
              <Link href="/demo" className="bg-indigo-500 hover:bg-indigo-950 hover:text-white w-full px-20 py-2 mb-7">View Demo</Link>
            </div>
          </section>
          <div className="bg-indigo-950 text-white w-full p-7 mt-20 mb-10 max-md:mb-0 ">
            <section className="flex flex-col space-y-5">
              <h3 className="font-bold text-3xl">Numbers that matters</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio obcaecati ullam facilis.</p>
            </section>
            <section className="flex justify-center items-center space-x-15 pt-5">
              <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4 text-center space-x-15 max-md:space-x-0">
                <span>
                  <p className="text-2xl">100%</p>
                  <h6>User Rating</h6>
                </span>
                <span>
                  <p className="text-2xl">6</p>
                  <h6>Years In Service</h6>
                </span>
                <span className="pr-3 border-r-2 max-md:border-0">
                  <p className="text-2xl">1,234</p>
                  <h6>No of Users</h6>
                </span>
                <span>
                <p className="text-2xl">700+</p>
                <h6>Alumni</h6>
              </span>
              </div>
              
            </section>
          </div>
        </div>
        {/* Contact */}
        <div className="w-screen bg-indigo-950 text-white -ml-5  flex flex-col items-center text-center p-5">
          <h3 className="text-3xl font-bold">Contact Us</h3>
          <section>
            <form action={handleSubmit} className="flex flex-col w-[90vw] p-5 pb-20 space-y-5 items-center max-md:pb-5">
              <label htmlFor="name" className="flex w-full flex-col items-start">
                <p className="w-full text-left">Full Name: </p>
                <input className="w-full border-white p-2 border-2 rounded h-10" type="text" name="name" id="name" placeholder="John Doe" />
              </label>

              <label htmlFor="email" className="flex w-full flex-col items-start">
                <p className="w-full text-left">Email:</p>
                <input className="w-full border-white p-2 border-2 rounded h-10" type="email" name="email" id="email" placeholder="example@email.com" />
              </label>

              <label htmlFor="message" className="flex w-full flex-col items-start">
                <p className="w-full text-left">Message:</p>
                <textarea className="w-full border-white border-2 p-2 rounded" name="message" id="" cols={50} rows={10}></textarea>
              </label>
              <button className="bg-white text-indigo-950 p-3 rounded hover:cursor-pointer w-full" type="submit">Send Mail</button>
            </form>
          </section>
        </div>
      </main>
      <footer className="bg-cyan-950 text-white p-5 flex justify-around hover:cursor-default max-md:flex-col max-md:space-y-5 max-md:items-center">
        <p>School. Management Web App ©2026</p>
        <p>Developed by Ataisi Nathan</p>
      </footer>
    </div>
  );
}
