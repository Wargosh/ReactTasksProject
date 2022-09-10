import { useState } from 'react';
import { ListGroup, Form, Modal, Button } from 'react-bootstrap';

import { TaskAPI } from '../../api/task.api';
import { TaskDTO } from '../../api/dtos/task.dto';
import useFormatText from '../../hooks/useFormatText'
import { TagDTO } from '../../api/dtos/tag.dto';
import { TagAPI } from '../../api/tag.api';
import { FaRegTrashAlt } from 'react-icons/fa';

type Props = {
    showModal: boolean;
    handleClose: () => void;
    onTaskCreated: (task: TaskDTO) => void;
    setTagNames: (tags: TagDTO[]) => void;
    tagNames: TagDTO[];
};

interface Tag {
    id?: number;
    name: string;
}

const CreateTaskModal = ({ showModal, handleClose, onTaskCreated, tagNames, setTagNames }: Props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState<number[]>([])
    const [tag, setTag] = useState<Tag>({ name: '' })

    const { formatText } = useFormatText()

    const addTag = (nameTag: string) => {
        setTag({ name: nameTag })
    }

    const createTag = () => {
        if (tag.name.length > 0) {
            saveTag(tag.name)
            setTag({ name: '' })
        }
    }

    const saveTag = async (name: string) => {
        const tag = {
            name: formatText(name),
        }
        const resp = await TagAPI.saveTag(tag);
        console.log('new tag', resp);
        const tagExist = tagNames.find((t) => t.id === resp.id)
        if (!tagExist) {
            setTagNames([...tagNames, resp])
        }
        setTags([...tags, resp.id])
    }

    const removeTag = async (tagId: number) => {
        setTags(tags.filter(t => t !== tagId))
    }

    const createTask = async () => {
        const task = {
            title: formatText(title),
            description: formatText(description),
            archived: false,
            tags: tags
        }
        const resp = await TaskAPI.saveTask(task);
        onTaskCreated({ ...task, id: resp.id });
        console.log('new task', resp);
        handleClose()
    }

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Note</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-content">
                        <Form.Group className="mb-3" controlId="form.ControlTitle">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="form.ControlContent">
                            <Form.Label>Content:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="form.ControlTags">
                            <Form.Label>Categories:</Form.Label>
                            <ListGroup>
                                {
                                    tags.map((t) =>
                                        <ListGroup.Item key={t} className="m-0 p-1" action>
                                            {tagNames.find((x) => x.id === t)?.name}
                                            <FaRegTrashAlt onClick={() => removeTag(t)} />
                                        </ListGroup.Item>
                                    )
                                }
                            </ListGroup>
                            <div className="row">
                                <div className="col-10">
                                    <Form.Control
                                        type="text"
                                        placeholder="Add your tags"
                                        onChange={(e) => addTag(e.target.value)}
                                        value={tag?.name}
                                    />
                                </div>
                                <div className="col-2">
                                    <Button variant="primary" type="button" onClick={createTag}>
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer">
                        <Button variant="secondary" type="button" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="button" onClick={createTask}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default CreateTaskModal