import { useState, useEffect } from 'react';
import axios from 'axios';
import { Resume } from '../types/Resume';
import ResumeCard from './ResumeCard';
import AddResumeForm from './AddResumeForm';
import styles from './ResumeList.module.css';

const ResumeList = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>('dateDescending');
  const [editMode, setEditMode] = useState<string | null>(null);

  const fetchResumes = () => {
    setLoading(true);
    axios
      .get<Resume[]>('http://localhost:8080/api/resumes')
      .then((response) => {
        setResumes(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load resumes');
        setLoading(false);
      });
  };

  const getSortedResumes = () => {
    const sortedResumes = [...resumes];
    if (sortOption === 'dateDescending') {
      sortedResumes.sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime());
    } else if (sortOption === 'dateAscending') {
      sortedResumes.sort((a, b) => new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime());
    } else if (sortOption === 'status') {
      sortedResumes.sort((a, b) => a.status.localeCompare(b.status));
    }
    return sortedResumes;
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleAddResume = (formData: FormData) => {
    axios
      .post('http://localhost:8080/api/resumes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => fetchResumes())
      .catch(() => setError('Failed to add resume'));
    setShowAddForm(false);
  };

  const handleDeleteResume = (id: string) => {
    axios
      .delete(`http://localhost:8080/api/resumes/${id}`)
      .then(() => fetchResumes())
      .catch(() => setError('Failed to delete resume'));
  };

  const handleEditResume = (id: string) => {
    setEditMode(id);
  };

  const handleSaveEdit = (updatedResume: Resume, newFiles: { resumeFile?: File; coverLetterFile?: File }) => {
    const data = new FormData();
    data.append('company', updatedResume.company);
    data.append('jobTitle', updatedResume.jobTitle);
    data.append('jobDescription', updatedResume.jobDescription || '');
    data.append('dateApplied', updatedResume.dateApplied);
    data.append('status', updatedResume.status);

    if (newFiles.resumeFile) {
        data.append('resumeFile', newFiles.resumeFile);
    }
    if (newFiles.coverLetterFile) {
      data.append("coverLetterFile", newFiles.coverLetterFile); // Append actual File object
  }

    // Debugging log
    console.log("FormData being sent:");
    for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
    }

    axios
        .put(`http://localhost:8080/api/resumes/${updatedResume.id}`, data, {
            
        })
        .then(() => {
            setEditMode(null);
            fetchResumes(); // Refresh after updating
        })
        .catch((error) => {
            console.error('Failed to update resume:', error);
            setError('Failed to update resume');
        });
};



  const handleCancelEdit = () => {
    setEditMode(null);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div>
      <h1>Resume Tracker</h1>

      <div className={styles.controls}>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="dateDescending">Date Applied (Newest First)</option>
          <option value="dateAscending">Date Applied (Oldest First)</option>
          <option value="status">Status</option>
        </select>
        {!showAddForm && <button onClick={() => setShowAddForm(true)}>Add New Resume</button>}
      </div>

      {showAddForm && (
        <AddResumeForm onAdd={handleAddResume} onCancel={() => setShowAddForm(false)} />
      )}

      <hr />

      {loading ? (
        <p>Loading resumes...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className={styles.list}>
          {getSortedResumes().map((resume) => (
            <li key={resume.id}>
              <ResumeCard
                resume={resume}
                isEditing={editMode === resume.id}
                onEdit={() => handleEditResume(resume.id!)}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
                onDelete={handleDeleteResume}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResumeList;