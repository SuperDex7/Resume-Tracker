import { useState } from 'react';
import { Resume } from '../types/Resume';

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

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
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
        if (resumeFile) data.append('resumeFile', resumeFile); // Use the file object
    if (coverLetterFile) data.append('coverLetterFile', coverLetterFile); // Use the file object

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

            <div>
                <label>Resume File:</label>
                <input type="file" name="resumeFile" onChange={handleFileChange} />
            </div>

            <div>
                <label>Cover Letter File:</label>
                <input type="file" name="coverLetterFile" onChange={handleFileChange} />
            </div>

            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
};

export default AddResumeForm;
