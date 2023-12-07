import { useState, ChangeEvent } from 'react'
import './App.css'
import { IRecord } from './interfaces'
import RecordsList from './components/RecordsList';
import { v4 as uuidv4 } from 'uuid';
 
const App: React.FC = () => {

  const [recordDate, setRecordDate] = useState<Date | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [recordsList, setRecordsList] = useState<IRecord[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "date") {
      setRecordDate(new Date(event.target.value))
    } else {
      setDistance(Number(event.target.value))
    }
  }

  const addOrUpdateRecord = (): void => {
    const existingRecord = recordsList.find(
      (record) => record.date.getTime() === recordDate!.getTime()
    );

    if (existingRecord) {
      const updatedRecordsList = recordsList.map((record) =>
        record.date.getTime() === recordDate!.getTime()
          ? { ...record, distance: record.distance + distance }
          : record
      );
      setRecordsList(updatedRecordsList);
    } else {
      const newRecord: IRecord = { id: uuidv4(), date: recordDate!, distance: distance };
      setRecordsList([newRecord, ...recordsList].sort((a, b) => b.date.getTime() - a.date.getTime()));
    }

    setRecordDate(null);
    setDistance(0);
  }

  const deleteRecord = (recordId: string): void => {
    setRecordsList(recordsList.filter((record) => record.id !== recordId));
  };

  return (
    <div className="app-wrapper">
      <div className="add-record-wrapper">
        <div className="add-record">
          <label>Дата (ДД.ММ.ГГ)</label>
          <input 
            className="date-input"
            onChange={handleChange}
            type="date" 
            name="date"
            value={recordDate ? recordDate.toISOString().split('T')[0] : ''}
          />
        </div>
        <div className="add-record">
          <label>Пройдено км</label>
          <input 
            className="distance-input"
            onChange={handleChange}
            name="distance"
            value={distance}
          />
        </div>
        <div className="add-record-button">
          <button onClick={addOrUpdateRecord}>OK</button>
        </div>  
      </div>
      <div className="records-list">
        <div className="titles">
          <span>Дата (ДД.ММ.ГГ)</span>
          <span>Пройдено, км</span>
          <span>Действия</span>
        </div>
        {recordsList.map((record: IRecord) => {
          return (
            <RecordsList 
              key={uuidv4()}
              record={record}
              onDelete={deleteRecord}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
