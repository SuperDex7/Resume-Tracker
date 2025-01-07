import { useState } from 'react';
import { format } from 'date-fns';
import { Resume } from '../types/Resume';
import styles from './ResumeCard.module.css';

interface Props {
  resume: Resume;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (updatedResume: Resume) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

const ResumeCard = ({ resume, isEditing, onEdit, onSave, onCancel, onDelete }: Props) => {
  const [formData, setFormData] = useState<Resume>({ ...resume });
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Rejected':
        return styles.statusRejected;
      case 'Pending':
        return styles.statusPending;
      case 'Interview':
        return styles.statusInterview;
      case 'Offer Received':
        return styles.statusOffer;
      default:
        return '';
    }
  };

  if (isEditing) {
    return (
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <h2 className={styles.company}>{formData.company}</h2>
          <input
            type="date"
            name="dateApplied"
            value={formData.dateApplied}
            onChange={handleInputChange}
            className={styles.dateInput}
          />
        </div>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleInputChange}
          className={styles.jobTitleInput}
          placeholder="Job Title"
        />
        <textarea
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleInputChange}
          className={styles.jobDescriptionInput}
          placeholder="Job Description"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className={styles.statusDropdown}
        >
          <option value="Pending">Pending</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer Received">Offer Received</option>
        </select>
        <div className={styles.actions}>
          <button onClick={() => onSave(formData)}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <h2 className={styles.company}>{resume.company}</h2>
        <p className={`${styles.status} ${getStatusClass(resume.status)}`}>{resume.status}</p>
      </div>
      <div className={styles.headerDivider}></div>
      <div className={styles.titleRow}>
        <h3 className={styles.jobTitle}>{resume.jobTitle}</h3>
        <p className={styles.date}>
          <strong>Date Applied:</strong> {format(new Date(resume.dateApplied), 'MM/dd/yyyy')}
        </p>
      </div>
      <p>
        <strong>Job Description:</strong>{' '}
        {showFullDescription || !resume.jobDescription || resume.jobDescription.length <= 50
          ? resume.jobDescription || 'N/A'
          : `${resume.jobDescription.substring(0, 50)}...`}
      </p>
      {resume.jobDescription && resume.jobDescription.length > 50 && (
        <button className={styles.toggleButton} onClick={toggleDescription}>
          {showFullDescription ? 'Show Less' : 'Show More'}
        </button>
      )}
      <div className={styles.actions}>
        <button className={styles.actionButton} onClick={onEdit}>
          Edit
        </button>
        <button className={styles.actionButton} onClick={() => onDelete(resume.id!)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ResumeCard;
