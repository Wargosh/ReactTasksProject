import { Form } from 'react-bootstrap'
import { TagDTO } from '../api/dtos/tag.dto';

type Props = {
    handleChangeSelectFilter: (e: any) => void;
    handleChangeFilterTags: (e: any) => void;
    tags: TagDTO[];
}

const FiltersContainer = ({ handleChangeSelectFilter, handleChangeFilterTags, tags }: Props) => {
    return (
        <>
            <div className="row">
                <div className="col-2">
                    <Form.Label>Filter:</Form.Label>
                </div>
                <div className="col-4">
                    <Form.Select onChange={(e) => handleChangeSelectFilter(e)}>
                        <option value="0">Actives</option>
                        <option value="1">Archived</option>
                    </Form.Select>
                </div>
                <div className="col-2">
                    <Form.Label>Category:</Form.Label>
                </div>
                <div className="col-4">
                    <Form.Select onChange={(e) => handleChangeFilterTags(e)}>
                        <option>-- Select category --</option>
                        {
                            tags.map((data) => (
                                <option key={data.id} value={data.id}>{data.name}</option>
                            ))
                        }
                    </Form.Select>
                </div>
            </div>
        </>
    )
}

export default FiltersContainer