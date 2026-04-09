import React from 'react';
import ClassicTemplate from '../templates/ClassicTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import CorporateTemplate from '../templates/CorporateTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import ExecutiveTemplate from '../templates/ExecutiveTemplate';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import ElegantTemplate from '../templates/ElegantTemplate';
import PortfolioTemplate from '../templates/PortfolioTemplate';
import GradientTemplate from '../templates/GradientTemplate';

/**
 * ResumePreview component that switches between different templates
 * based on the provided templateId in data.
 */
const ResumePreview = ({ data }) => {
    switch (data.templateId) {
        case 'classic':
            return <ClassicTemplate data={data} />;
        case 'minimal':
            return <MinimalTemplate data={data} />;
        case 'corporate':
            return <CorporateTemplate data={data} />;
        case 'creative':
            return <CreativeTemplate data={data} />;
        case 'executive':
            return <ExecutiveTemplate data={data} />;
        case 'professional':
            return <ProfessionalTemplate data={data} />;
        case 'elegant':
            return <ElegantTemplate data={data} />;
        case 'portfolio':
            return <PortfolioTemplate data={data} />;
        case 'gradient':
            return <GradientTemplate data={data} />;
        case 'modern':
        default:
            return <ModernTemplate data={data} />;
    }
};

export default ResumePreview;
