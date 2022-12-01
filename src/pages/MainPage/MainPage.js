import React, { useEffect, useState } from "react";
import useAppDispatch from "../../hooks/useAppDispatch";
import useAppSelector from "../../hooks/useAppSelector";
import { getProjects } from "../../redux/actions/actionCreator";
import Loader from "../../components/Loader/Loader";
import AddProjectModal from "../../components/Modals/AddProjectModal";
import EditProjectModal from "../../components/Modals/EditProjectModal";
import DeleteModal from "../../components/Modals/DeleteProjectModal";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import "./MainPage.scss";

const MainPage = () => {
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [editItem, setEditItem] = useState({});

  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((store) => store.projects);
  const { isLoadingProjects, ubdateProjects } = useAppSelector(
    (store) => store.loadState
  );

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch, ubdateProjects]);

  const handleEdit = (item) => {
    setEditItem(item);
    setOpenEditModal(true);
  };

  const handleDelete = (item) => {
    setDeleteItem(item);
    setOpenDeleteModal(true);
  };

  return (
    <div className="main_page_container">
      <div className="main_page_content">
        <div className="main_header">
          <h3>Projects</h3>
          <div>
            <button className="btn_content" onClick={() => setOpen(true)}>
              Add Project
            </button>
          </div>
          <div className="display_hide_content">hide</div>
        </div>
        <div>
          {isLoadingProjects && <Loader />}
          {JSON.stringify(projects) === "[]" && <h4>No projects yet...</h4>}
          {projects?.map((project) => (
            <ProjectItem
              key={project?.id}
              project={project}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      <AddProjectModal open={open} setOpen={setOpen} />
      <EditProjectModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        project={editItem}
      />
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        deleteItem={deleteItem}
        type="project"
      />
    </div>
  );
};

export default MainPage;
