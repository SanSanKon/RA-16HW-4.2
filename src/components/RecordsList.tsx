import { IRecord } from "../interfaces";

interface Props {
    record: IRecord;
    onDelete: (recordId: string) => void;
}

const RecordsList: React.FC<Props> = ({record, onDelete}) => {
    const handleDelete = (): void => {
        onDelete(record.id)
    }
    return (
        <div className="record">
            <div className="content">
                <span>{record.date.toLocaleDateString()}</span>
                <span>{record.distance}</span>
            
                <button onClick={handleDelete}>X</button>
            </div>
        </div>
    )
}

export default RecordsList;