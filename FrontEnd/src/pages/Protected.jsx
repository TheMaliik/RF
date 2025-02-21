import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Protected() {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("faceAuth")) {
      navigate("/login");
    }

    const { account } = JSON.parse(localStorage.getItem("faceAuth"));
    setAccount(account);
  }, []);

  if (!account) {
    return null;
  }

  return (
    <div className="h-full flex items-center bg-indigo-100 flex-col justify-center gap-10">
      <h1 className="font-poppins text-2xl text-green-600">
        You have successfully logged In.{" "}
      </h1>
      <div class="py-8  px-8 w-[450px] h-[250px] mx-auto  bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 overflow-hidden">
        <img
          class="block mx-auto h-36 rounded-xl sm:mx-0 sm:shrink-0"
          src={account.picture}
          alt={account.name}
        />
        <div class="text-center w-full space-y-5 sm:text-left">
          <div class="space-y-0.5">
            <p>{account.email}</p>
            <p class="text-4xl text-black font-semibold">{account.name}</p>
            <p class="text-green-500 font-medium border-2 rounded-full border-green-200 w-fit px-2">
              verified
            </p>
          </div>
          <div
            onClick={() => {
              localStorage.removeItem("faceAuth");
              navigate("/");
            }}
            className="flex gap-2 w-fit  my-5 cursor-pointer px-3 py-2 rounded-full bg-gradient-to-r bg-red-400  "
          >
            <span className="text-white">Log Out</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* <div className="bg-white pt-40 md:pt-60">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-12">
            You have successfully logged in!
          </h2>
          <div className="text-center mb-24">
            <img
              className="mx-auto mb-8 object-cover h-48 w-48 rounded-full"
              src={account.picture}
              alt={account.fullName}
            />
            <h1
              className="block text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800"
              style={{
                lineHeight: "1.5",
              }}
            >
              {account?.fullName}
            </h1>
            <div
              onClick={() => {
                localStorage.removeItem("faceAuth");
                navigate("/");
              }}
              className="flex gap-2 mt-12 w-fit mx-auto cursor-pointer z-10 py-3 px-6 rounded-full bg-gradient-to-r from-red-400 to-red-600"
            >
              <span className="text-white">Log Out</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Protected;
