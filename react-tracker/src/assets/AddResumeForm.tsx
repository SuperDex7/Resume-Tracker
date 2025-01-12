import { useState } from 'react';
import { Resume } from '../types/Resume';
import styles from './AddResumeForm.module.css';

interface Props {
  onAdd: (formData: FormData) => void;
  onCancel: () => void;
}

const AddResumeForm = ({ onAdd, onCancel }: Props) => {
  const [formData, setFormData] = useState<Resume>({
    company: '',
    jobTitle: '',
    jobDescription: '',
    dateApplied: '',
    status: 'Pending',
    resumeFilePath: '',
    coverFilePath: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (name === 'resumeFile' && files) setResumeFile(files[0]);
    if (name === 'coverLetterFile' && files) setCoverLetterFile(files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('company', formData.company);
    data.append('jobTitle', formData.jobTitle);
    data.append('jobDescription', formData.jobDescription || '');
    data.append('dateApplied', formData.dateApplied);
    data.append('status', formData.status);
    if (resumeFile) data.append('resumeFile', resumeFile);
    if (coverLetterFile) data.append('coverLetterFile', coverLetterFile);

    onAdd(data);
    setFormData({
      company: '',
      jobTitle: '',
      jobDescription: '',
      dateApplied: '',
      status: 'Pending',
      resumeFilePath: '',
      coverFilePath: '',
    });
    setResumeFile(null);
    setCoverLetterFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Add New Resume</h2>
      <div className={styles.formGroup}>
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="jobDescription">Job Description:</label>
        <textarea
          id="jobDescription"
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="dateApplied">Date Applied:</label>
        <input
          type="date"
          id="dateApplied"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="status">Status:</label>
        <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
          <option value="Pending">Pending</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer Received">Offer Received</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="resumeFile">Resume File:</label>
        <input type="file" id="resumeFile" name="resumeFile" onChange={handleFileChange} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="coverLetterFile">Cover Letter File:</label>
        <input type="file" id="coverLetterFile" name="coverLetterFile" onChange={handleFileChange} />
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.saveButton}>Save</button>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddResumeForm;
