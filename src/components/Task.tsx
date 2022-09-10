import { Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaFileArchive, FaFileDownload } from 'react-icons/fa';
import { TagDTO } from '../api/dtos/tag.dto';
import { TaskDTO } from '../api/dtos/task.dto'
import { TaskAPI } from "../api/task.api";

type Props = {
    data: TaskDTO;
    onTaskDeleted: (taskId: number) => void;
    onOpenModal: (task: TaskDTO) => void;
    onTaskUpdated: (task: TaskDTO) => void;
    onAlertModal: (task: TaskDTO) => void;
    tags: TagDTO[];
}

const Task = ({ data, onTaskDeleted, onTaskUpdated, onOpenModal, tags, onAlertModal }: Props) => {
    const editStatusTask = async (status: boolean) => {
        data.archived = status;
        console.log('updating status to', data);
        
        const resp = await TaskAPI.updateTask(data.id, data)
        onTaskUpdated(resp);
    }

    const handleArchiveTask = () => editStatusTask(true);
    const handleUnarchiveTask = () => editStatusTask(false);

    return (
        <>
            <Card style={{ width: '18rem' }} bg="light" border="dark" text='dark'>
                <Card.Header>
                    {
                        data.tags.map((t) => (
                            <Badge key={t} bg="dark">{tags.find((x) => x.id === t)?.name}</Badge>
                        ))
                    }
                </Card.Header>
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>{data.description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button variant="danger" type="button" onClick={() => onAlertModal(data)}>
                        Delete
                    </Button>
                    <Button variant="primary" type="button" onClick={() => onOpenModal(data)}>
                        Edit
                    </Button>
                    {
                        (!data.archived) ?
                            <Button variant="secondary" type="button" onClick={handleArchiveTask}>
                                Archive <FaFileArchive />
                            </Button> :
                            <Button variant="secondary" type="button" onClick={handleUnarchiveTask}>
                                Unarchive <FaFileDownload />
                            </Button>
                    }
                </Card.Footer>
            </Card>
        </>
    )
}

export default Task