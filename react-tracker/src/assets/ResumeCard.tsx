import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Resume } from '../types/Resume';
import styles from './ResumeCard.module.css';

interface Props {
  resume: Resume;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (updatedResume: Resume, newFiles: { resumeFile?: File; coverLetterFile?: File }) => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

const ResumeCard = ({ resume, isEditing, onEdit, onSave, onCancel, onDelete }: Props) => {
  const [formData, setFormData] = useState<Resume>({ ...resume });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showPopup, setShowPopup] = useState<{ type: 'resume' | 'coverLetter'; visible: boolean }>({
    type: 'resume',
    visible: false,
  });

  const togglePopup = (type: 'resume' | 'coverLetter') => {
    setShowPopup({ type, visible: !showPopup.visible });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    console.log(`File input changed: ${name}`);
    if (files && files.length > 0) {
        console.log(`File selected:`, files[0]);
    } else {
        console.log('No file selected');
    }
    if (name === 'resumeFile') {
        setResumeFile(files && files[0]);
    } else if (name === 'coverLetterFile') {
        setCoverLetterFile(files && files[0]);
    }
};

  const saveChanges = () => {
    const updatedResume: Resume = {
        ...formData,
        resumeFilePath: resumeFile ? resumeFile.name : formData.resumeFilePath,
        coverFilePath: coverLetterFile ? coverLetterFile.name : formData.coverFilePath,
        
    };
    
    onSave(updatedResume, {
        resumeFile: resumeFile || undefined,
        coverLetterFile: coverLetterFile || undefined,
        
    });
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
        <form className={styles.editForm}>
          <h3 className={styles.title}>Edit Resume</h3>
          <div className={styles.formGroup}>
            <label htmlFor="company">Company Name:</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={styles.input}
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
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="jobDescription">Job Description:</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              className={styles.textarea}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="Pending">Pending</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer Received">Offer Received</option>
            </select>
          </div>
          <div className={styles.fileGroup}>
            <div>
              <label htmlFor="resumeFile">Upload Resume:</label>
              <input
                type="file"
                id="resumeFile"
                name="resumeFile"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
              <p>
                Current Resume: {resumeFile ? resumeFile.name : resume.resumeFilePath ? 'Uploaded' : 'None'}
              </p>
            </div>
            <div>
              <label htmlFor="coverLetterFile">Upload Cover Letter:</label>
              <input
                type="file"
                id="coverLetterFile"
                name="coverLetterFile"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
              <p>
                Current Cover Letter:{' '}
                {coverLetterFile ? coverLetterFile.name : resume.coverFilePath ? 'Uploaded' : 'None'}
              </p>
            </div>
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={saveChanges} className={styles.saveButton}>
              Save
            </button>
            <button type="button" onClick={onCancel} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
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
          <strong>Date Applied:</strong> {format(parseISO(resume.dateApplied), 'MM/dd/yyyy')}
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
      <div className={styles.fileContainer}>
        {resume.resumeFilePath && (
          <div className={styles.blurredBox} onClick={() => togglePopup('resume')}>
            <span>Resume</span>
          </div>
        )}
        {resume.coverFilePath && (
          <div className={styles.blurredBox} onClick={() => togglePopup('coverLetter')}>
            <span>Cover Letter</span>
          </div>
        )}
      </div>

      {showPopup.visible && (
        <div className={styles.popupOverlay} onClick={() => setShowPopup({ ...showPopup, visible: false })}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`http://localhost:8080/${showPopup.type === 'resume' ? resume.resumeFilePath : resume.coverFilePath}`}
              title={showPopup.type}
              className={styles.fileViewer}
            ></iframe>
          </div>
        </div>
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
