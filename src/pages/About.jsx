import React from "react";
import { Link } from "react-router";

const About = () => {
  return (
    <div className="text-center text-white pt-22 flex flex-col justify-center align-center max-w-full">
      <h1 className="text-4xl mt-4 mb-12 justify-center">About</h1>
      <p>This website was made by</p>
      <div className="flex flex-row w-full justify-center pt-2 mb-12 gap-12">
        <Link to="https://reactnative.dev/" target="_blank">
          {" "}
          <img
            src="https://reactnative.dev/img/header_logo.svg"
            alt="reactnative"
            className="w-[80px] h-[80px]"
          />{" "}
        </Link>
        <Link to="https://tailwindcss.com/" target="_blank">
          {" "}
          <img
            src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
            alt="tailwind"
            className="w-[80px] h-[80px]"
          />{" "}
        </Link>
      </div>
      <ul className="flex flex-col text-center min-w-full ">
        <li>
          Font used:{" "}
          <Link
            to="https://tailwindcss.com/docs/guides/vite"
            target="_blank"
            className="font-bold text-2xl"
          >
            Cal Sans
          </Link>
        </li>
        <li>
          Background:{" "}
          <Link
            to="https://bg.ibelick.com/"
            target="_blank"
            className="font-bold text-2xl"
          >
            bg-snippets
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default About;
