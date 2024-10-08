import Input from "./Input";
import Button from "./Button";
import Textarea from "./Textarea";
import { useState } from "react";
import { v4 as uniqueId } from "uuid";
import { CreateProject } from "../../utils/Helpers";

const ProjectForm = ({
  closeForm,
  project,
  setProject,
  editProject,
  setEditForm,
}) => {
  const [currProject, setCurrProject] = useState(
    editProject || new CreateProject(),
  );
  const [error, setError] = useState(false);
  const handleChange = (event, key) => {
    setCurrProject({ ...currProject, [key]: event.target.value });
  };
  const save = () => {
    const { projectName, techUsed, description } = currProject;
    if (!projectName || !techUsed || !description) {
      setError(true);
    } else {
      let newProjectSet;
      if (editProject) {
        newProjectSet = project.map((thisProject) => {
          if (thisProject.key === editProject.key) {
            return currProject;
          }
          return thisProject;
        });
      } else {
        newProjectSet = [...project, { ...currProject, key: uniqueId() }];
      }
      localStorage.setItem("projects", JSON.stringify(newProjectSet));
      setProject(newProjectSet);
      setEditForm(null);
      closeForm();
    }
  };
  const cancel = () => {
    setEditForm(new CreateProject());
    closeForm();
  };
  return (
    <div>
      <Input
        label={"Project Name"}
        required
        value={currProject.projectName}
        onChange={(event) => handleChange(event, "projectName")}
        placeholder={"Food App"}
      />
      <Input
        label={"Tech Used"}
        required
        value={currProject.techUsed}
        onChange={(event) => handleChange(event, "techUsed")}
        placeholder={"HTML, CSS, JavaScript"}
      />
      <div className="flex space-x-5">
        <Input
          label={"Start Date"}
          className={"grow"}
          placeholder={"August 2022"}
          value={currProject.startDate}
          onChange={(event) => handleChange(event, "startDate")}
        />
        <Input
          label={"End Date"}
          className={"grow"}
          placeholder={"August 2025"}
          value={currProject.endDate}
          onChange={(event) => handleChange(event, "endDate")}
        />
      </div>
      <Textarea
        label={"Description"}
        required
        placeholder={
          "Separate each achievement with enter key ↵ \nExample:-\nDeveloped a REST API using FastAPI and PostgreSQL to store data from learning management systems. \nDeveloped a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data."
        }
        value={currProject.description}
        onChange={(event) => handleChange(event, "description")}
      />
      <div className="flex space-x-5">
        <Input
          label={"Github Link"}
          className={"grow"}
          placeholder={""}
          value={currProject.githubLink}
          onChange={(event) => handleChange(event, "githubLink")}
        />
        <Input
          label={"Live Link"}
          className={"grow"}
          placeholder={""}
          value={currProject.liveLink}
          onChange={(event) => handleChange(event, "liveLink")}
        />
      </div>
      <div className="flex space-x-6 justify-center">
        <Button onClick={save} className={" bg-green-600 text-white shadow-md"}>
          Save
        </Button>
        <Button onClick={cancel} className={" shadow-md"}>
          Cancel
        </Button>
      </div>
      <p className="text-red-500 mt-10 text-center">
        {error && "Some fields are missing"}
      </p>
    </div>
  );
};
export default ProjectForm;
