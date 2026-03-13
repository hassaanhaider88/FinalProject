import React, { useContext } from "react";
import { CourseContext } from "../Store/CourseStore";
import SingleCourse from "../Components/SingleCourse";
import Loading from "../Components/Loading";

const CourseListing = () => {
  const { AllCourses, CourseLoading, CourseError } = useContext(CourseContext);

  return (
    <>
      {CourseLoading && (
        <div className="w-full my-10 gap-3 animate-bounce h-full flex justify-center items-center">
          <Loading />
        </div>
      )}

      {CourseError && (
        <p className="text-center my-10 text-sm text-red-400">
          Something Wents Wrong On Server...
        </p>
      )}
      <div className="grid py-10 px-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {AllCourses.map((course) => (
          <SingleCourse key={course.id} course={course} />
        ))}
      </div>
    </>
  );
};

export default CourseListing;
