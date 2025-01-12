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
  const [editingResumeId, setEditingResumeId] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('dateDescending');
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  const getFilteredAndSortedResumes = () => {
    let filteredResumes = resumes.filter((resume) =>
      resume.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resume.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOption === 'dateDescending') {
      filteredResumes.sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime());
    } else if (sortOption === 'dateAscending') {
      filteredResumes.sort((a, b) => new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime());
    } else if (sortOption === 'status') {
      filteredResumes.sort((a, b) => a.status.localeCompare(b.status));
    }
    return filteredResumes;
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddResume = (formData: FormData) => {
    axios
      .post('http://localhost:8080/api/resumes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
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

  const handleSaveEdit = (updatedResume: Resume) => {
    axios
      .put(`http://localhost:8080/api/resumes/${updatedResume.id}`, updatedResume)
      .then(() => {
        fetchResumes();
        setEditingResumeId(null);
      })
      .catch(() => setError('Failed to update resume'));
  };

  const handleEdit = (id: string) => {
    setEditingResumeId(id);
  };

  const handleCancelEdit = () => {
    setEditingResumeId(null);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Resume Tracker</h1>

      <div className={styles.controlsRow}>
  <button onClick={() => setShowAddForm(true)} className={styles.addButton}>
    Add Resume
  </button>
  <div className={styles.searchAndSort}>
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearchChange}
      className={styles.searchInput}
    />
    <select value={sortOption} onChange={handleSortChange} className={styles.sortDropdown}>
      <option value="dateDescending">Date Applied (Newest First)</option>
      <option value="dateAscending">Date Applied (Oldest First)</option>
      <option value="status">Status</option>
    </select>
  </div>
</div>


      {showAddForm && <AddResumeForm onAdd={handleAddResume} onCancel={() => setShowAddForm(false)} />}

      <hr />

      {loading ? (
        <p>Loading resumes...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className={styles.list}>
          {getFilteredAndSortedResumes().map((resume) => (
            <li key={resume.id}>
              <ResumeCard
                resume={resume}
                isEditing={editingResumeId === resume.id}
                onEdit={() => handleEdit(resume.id!)}
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
