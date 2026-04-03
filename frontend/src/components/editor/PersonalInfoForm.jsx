import React from 'react';
import Input from '../Input';

const PersonalInfoForm = ({ resumeData, setResumeData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setResumeData({
            ...resumeData,
            personalInfo: {
                ...resumeData.personalInfo,
                [name]: value
            }
        });
    };

    return (
        <div className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="First Name"
                    name="firstName"
                    value={resumeData.personalInfo.firstName}
                    onChange={handleChange}
                    placeholder="Rohan"
                />
                <Input
                    label="Last Name"
                    name="lastName"
                    value={resumeData.personalInfo.lastName}
                    onChange={handleChange}
                    placeholder="Sharma"
                />
            </div>

            <Input
                label="Job Title"
                name="jobTitle"
                value={resumeData.personalInfo.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Senior Software Engineer"
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={handleChange}
                    placeholder="rohan@codecanvas.in"
                />
                <Input
                    label="Phone Number"
                    name="phone"
                    value={resumeData.personalInfo.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="City"
                    name="city"
                    value={resumeData.personalInfo.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                />
                <Input
                    label="Country"
                    name="country"
                    value={resumeData.personalInfo.country}
                    onChange={handleChange}
                    placeholder="India"
                />
            </div>
        </div>
    );
};

export default PersonalInfoForm;
