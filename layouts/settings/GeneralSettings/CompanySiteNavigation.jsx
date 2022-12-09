import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { companyActions } from '@/redux/company/companySlice';
import SectionTitle from '@/components/SectionTitle';
import Toggle from '@/components/Toggle';

export default function CompanySiteNavigation() {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company.company);

  const [feedback, setFeedback] = useState(company.siteNavigation.feedback);
  const [roadmap, setRoadMap] = useState(company.siteNavigation.roadmap);
  const [announcements, setAnnouncements] = useState(company.siteNavigation.announcements);

  const updateCompanyNavigation = (fieldName, value) => {
    dispatch(
      companyActions.updateCompany({
        _id: company._id,
        siteNavigation: {
          [fieldName]: value
        }
      })
    );
  };
  useEffect(() => {
    setFeedback(company.siteNavigation.feedback);
    setRoadMap(company.siteNavigation.roadmap);
    setAnnouncements(company.siteNavigation.announcements);
  }, [company]);
  return (
    <>
      <div className="pb-4 mb-11 border-b border-slate-200">
        <SectionTitle
          sectionTitle="Site Navigation"
          sectionDescription="Please enter your current password to change your password."
        />
      </div>
      <div className="space-y-6">
        <Toggle
          title="Feedback"
          enabled={feedback}
          onChange={() => {
            setFeedback(!feedback);
            updateCompanyNavigation('feedback', !feedback);
          }}
        />
        <Toggle
          title="Roadmap"
          enabled={roadmap}
          onChange={() => {
            setRoadMap(!roadmap);
            updateCompanyNavigation('roadmap', !roadmap);
          }}
        />
        <Toggle
          title="Announcement"
          enabled={announcements}
          onChange={() => {
            setAnnouncements(!announcements);
            updateCompanyNavigation('announcements', !announcements);
          }}
        />
      </div>
    </>
  );
}
