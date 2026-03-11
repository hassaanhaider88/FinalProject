import React, { useContext } from "react";
import { CourseContext } from "../Store/CourseStore";
import SingleCourse from "../assets/SingleCourse";

const CourseListing = () => {
  const { AllCourses } = useContext(CourseContext);
  return (
    <div className="grid py-10 px-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {AllCourses.map((course) => (
        <SingleCourse key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseListing;
