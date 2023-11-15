import React from "react";
import CourseProvider from "../store";

const RootLayout = ({ children }) => {
  return (
    <CourseProvider>
      <main className="w-[1024px] m-auto font-sans p-4">{children}</main>
    </CourseProvider>
  );
};

export default RootLayout;
