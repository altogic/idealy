import CompanyListbox from '@/components/CompanyListbox';
import SectionTitle from '@/components/SectionTitle';
import { AUTHENTICATION_METHOD, IDEAS_PERMISSION_TYPE } from 'constants';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Authentication() {
  const company = useSelector((state) => state.company.company);

  const [authenticationSelected, setAuthenticationSelected] = useState(company.authentication.type);
  const [submitIdeasSelected, setSubmitIdeasSelected] = useState(
    company.authentication.submitIdeas
  );
  const [commentsSelected, setCommentsSelected] = useState(company.authentication.commentIdea);
  const [votingSelected, setVotingSelected] = useState(company.authentication.voteIdea);
  const [announcementsReactionsSelected, setAnnouncementsReactionsSelected] = useState(
    company.authentication.announcementReaction
  );

  const setAuthenticationDescription = (value) => {
    switch (value) {
      case 'Registered Users':
        return (
          <>
            Users must sign up to your app with{' '}
            <strong className="text-slate-700 dark:text-aa-400 purple:text-pt-400">
              name, email and password.
            </strong>{' '}
            Once authenticated they will be able to add Ideas, comments and vote.
          </>
        );
      case 'Guest Authentication':
        return (
          <>
            Users can add Ideas, comments and vote, without signing up. Guests must leave a{' '}
            <strong className="text-slate-700 dark:text-aa-400 purple:text-pt-400">
              name and email.
            </strong>
          </>
        );
      case 'Anonymous':
        return (
          <>
            Users can add Ideas, comments and vote, without signing up. Guests are{' '}
            <strong className="text-slate-700 dark:text-aa-400 purple:text-pt-400">
              not required to leave any details.
            </strong>
          </>
        );
      case 'Custom':
        return (
          <>
            Users may sign up to your app with{' '}
            <strong className="text-slate-700 dark:text-aa-400 purple:text-pt-400">
              name, email and password.
            </strong>{' '}
            Change the settings below to customize how they can interact with each section of your
            app.
          </>
        );
      default:
        return 'Users can sign up and sign in using their email address.';
    }
  };
  useEffect(() => {
    if (company?.authentication) {
      setAuthenticationSelected(company.authentication.type);
      setSubmitIdeasSelected(company.authentication.submitIdeas);
      setCommentsSelected(company.authentication.commentIdea);
      setVotingSelected(company.authentication.voteIdea);
      setAnnouncementsReactionsSelected(company.authentication.announcementReaction);
    }
  }, [company?.authentication]);
  return (
    <div>
      <div className="pb-4 mb-10 lg:mb-11 border-b border-slate-200 dark:border-aa-600 purple:border-pt-800">
        <SectionTitle
          sectionTitle="Authentication"
          sectionDescription="Manage authentication for your web app and widget."
          big
        />
      </div>
      <div className="max-w-2xl">
        <div className="divide-y divide-slate-200 dark:divide-aa-600 purple:divide-pt-600">
          <div className="pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <SectionTitle sectionTitle="Authentication method" />
              <CompanyListbox
                value={authenticationSelected}
                setValue={setAuthenticationSelected}
                label={authenticationSelected}
                options={AUTHENTICATION_METHOD}
                actionType="authentication"
                fieldName="type"
              />
            </div>
          </div>
          <div className="py-6">
            <div className="bg-slate-100 dark:bg-aa-600 purple:bg-pt-800 text-slate-500 dark:text-aa-200 purple:text-pt-200 py-6 px-8 text-sm tracking-sm rounded-lg">
              {setAuthenticationDescription(authenticationSelected)}
            </div>
          </div>
          {authenticationSelected === 'Custom' && (
            <div className="py-20 lg:py-24">
              <div className="divide-y divide-slate-200 dark:divide-aa-600 purple:divide-pt-600">
                <div className="pb-4">
                  <SectionTitle sectionTitle="Advanced settings" />
                </div>
                <CompanyListbox
                  value={submitIdeasSelected}
                  setValue={setSubmitIdeasSelected}
                  label={submitIdeasSelected}
                  options={IDEAS_PERMISSION_TYPE}
                  actionType="authentication"
                  fieldName="submitIdeas"
                  title="Submit Ideas"
                />
                <CompanyListbox
                  value={commentsSelected}
                  setValue={setCommentsSelected}
                  label={commentsSelected}
                  options={IDEAS_PERMISSION_TYPE}
                  actionType="authentication"
                  fieldName="commentIdea"
                  title="Comments"
                />
                <CompanyListbox
                  value={votingSelected}
                  setValue={setVotingSelected}
                  label={votingSelected}
                  options={IDEAS_PERMISSION_TYPE}
                  actionType="authentication"
                  fieldName="voteIdea"
                  title="Voting"
                />
                <CompanyListbox
                  value={announcementsReactionsSelected}
                  setValue={setAnnouncementsReactionsSelected}
                  label={announcementsReactionsSelected}
                  options={IDEAS_PERMISSION_TYPE}
                  actionType="authentication"
                  fieldName="announcementReaction"
                  title=" Announcements Reactions"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
