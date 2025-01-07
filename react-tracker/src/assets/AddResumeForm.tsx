import { useState } from 'react';
import { Resume } from '../types/Resume';
interface Props {
    onAdd: (formData: Resume) => void;
    onCancel: () => void;
  }
  
  const AddResumeForm = ({ onAdd, onCancel }: Props) => {
    const [formData, setFormData] = useState<Resume>({
      company: '',
      jobTitle: '',
      jobDescription: '',
      dateApplied: '',
      status: 'Pending',
    });
  
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onAdd(formData);
      setFormData({
        company: '',
        jobTitle: '',
        jobDescription: '',
        dateApplied: '',
        status: 'Pending',
      });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Add New Resume</h2>
        <div>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            required
          />
        </div>
  
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            required
          />
        </div>
  
        <div>
          <label>Job Description:</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleInputChange}
            placeholder="Optional"
          />
        </div>
  
        <div>
          <label>Date Applied:</label>
          <input
            type="date"
            name="dateApplied"
            value={formData.dateApplied}
            onChange={handleInputChange}
            required
          />
        </div>
  
        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleInputChange}>
            <option value="Pending">Pending</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer Received">Offer Received</option>
          </select>
        </div>
  
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    );
  };
  
  export default AddResumeForm;
  