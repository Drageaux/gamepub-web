export const FeedRoutesNames = {
  FEED: '',
};

export const ProfileRoutesNames = {
  PROFILE: ':username',
};

export const JobsRoutesNames = {
  JOBS: 'jobs',
};

export const ProjectsRoutesNames = {
  NEWPROJECT: 'new-project',
  PROJECTS: 'project',
  PROJECTPARAM: ':projectname',
  DETAILS: 'details',
  JOBS: `${JobsRoutesNames.JOBS}`,
  NEWJOB: 'new-job',
  JOBPARAM: ':jobnumber',
};
