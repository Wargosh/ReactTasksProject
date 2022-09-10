import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import { TaskAPI } from './api/task.api';
import { TagAPI } from './api/tag.api';
import { TaskDTO } from './api/dtos/task.dto';
import { TagDTO } from './api/dtos/tag.dto';
import Container from './components/Container';
import Task from './components/Task';
import CreateTaskModal from './components/modals/CreateTaskModal';
import EditTaskModal from './components/modals/EditTaskModal';
import FiltersContainer from './components/FiltersContainer';
import ModalAlert from './components/modals/ModalAlert';

function App() {
  const [tasks, setTasks] = useState<TaskDTO[]>([])
  const [showTasks, setShowTasks] = useState<TaskDTO[]>([])
  const [toggleFilterTasks, setToggleFilterTasks] = useState(false)
  const [toggleFilterTags, setToggleFilterTags] = useState<number>(0)
  const [tags, setTags] = useState<TagDTO[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAlertModal, setShowAlertModal] = useState(false)
  const [taskBeingEdited, setTaskBeingEdited] = useState<TaskDTO | undefined>(undefined)
  const [taskBeingDeleted, setTaskBeingDeleted] = useState<TaskDTO | undefined>(undefined)

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleShowEditModal = () => setShowEditModal(true);
  const handleShowAlertModal = () => setShowAlertModal(true);
  const handleCloseAlertModal = () => setShowAlertModal(false);

  const addTask = (task: TaskDTO) => {
    setTasks([...tasks, task])
  }

  const updateTask = (task: TaskDTO) => {
    setTasks(tasks.map(x => {
      if (x.id === task.id)
        return task;
      return x;
    }));
  }

  const removeTask = async () => {
    if (taskBeingDeleted) {
      await TaskAPI.deleteTask(taskBeingDeleted.id);
      setTasks(tasks.filter(x => x.id !== taskBeingDeleted!.id))
      setTaskBeingDeleted(undefined);
      handleCloseAlertModal()
    }
  }

  useEffect(() => {
    const fetchAllTags = async () => {
      const resp = await TagAPI.getAllTags();
      setTags(resp.data)
    }

    fetchAllTasks()
    fetchAllTags()
  }, [])

  const fetchAllTasks = async () => {
    const resp = await TaskAPI.getAll();
    setTasks(resp.data)
  }

  useEffect(() => {
    setShowTasks(tasks.filter(t => t.archived === toggleFilterTasks))
  }, [tasks])

  useEffect(() => {
    if (toggleFilterTags) {
      setShowTasks(tasks.filter(t => {
        if (t.tags.find(t => t === toggleFilterTags))
          return t
        else
          return null
      }))
    } else {
      fetchAllTasks()
    }
  }, [toggleFilterTags])

  const handleChangeSelectFilter = (e: any) => {
    console.log(e.target.value);
    if (e.target.value === '1') {
      setShowTasks(tasks.filter(t => t.archived === true))
      setToggleFilterTasks(true)
    } else {
      setShowTasks(tasks.filter(t => t.archived === false))
      setToggleFilterTasks(false)
    }
  }

  const handleChangeFilterTags = (e: any) => {
    setToggleFilterTags(parseInt(e.target.value))
  }

  return (
    <main className="bg-dark vh-100 text-white">
      {
        showCreateModal &&
        <CreateTaskModal
          handleClose={handleCloseCreateModal}
          showModal={showCreateModal}
          onTaskCreated={addTask}
          tagNames={tags}
          setTagNames={setTags}
        />
      }
      {
        <EditTaskModal
          handleClose={handleCloseEditModal}
          showModal={showEditModal}
          onTaskUpdated={updateTask}
          data={taskBeingEdited}
          tagNames={tags}
          setTagNames={setTags}
        />
      }
      {
        <ModalAlert
          confirmAction={removeTask}
          handleClose={handleCloseAlertModal}
          showModal={showAlertModal}
        />
      }

      <Container>
        <h1>{toggleFilterTasks ? 'Archived' : 'My'} Notes</h1>
        <Button variant="primary" type="button" onClick={handleShowCreateModal}>
          Create note
        </Button>

        <FiltersContainer
          tags={tags}
          handleChangeSelectFilter={handleChangeSelectFilter}
          handleChangeFilterTags={handleChangeFilterTags}
        />

        {
          showTasks.map((data) => (
            <Task
              key={data.id}
              data={data}
              onTaskDeleted={removeTask}
              onOpenModal={(task: TaskDTO) => {
                setTaskBeingEdited(task)
                handleShowEditModal()
              }}
              onTaskUpdated={updateTask}
              onAlertModal={(task: TaskDTO) => {
                setTaskBeingDeleted(task)
                handleShowAlertModal()
              }}
              tags={tags}
            />
          ))
        }
      </Container>
    </main>
  );
}

export default App;
