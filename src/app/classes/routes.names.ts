export const FeedRoutesNames = {
  FEED: '',
};

export const ProfileRoutesNames = {
  PROFILE: ':username',
  PROFILEPARAMNAME: 'username',
};

export const JobsRoutesNames = {
  JOBS: 'jobs',
};

export const ProjectsRoutesNames = {
  NEWPROJECT: 'new-project',
  ROOT: 'projects',
  PROJECTPARAM: ':projectname',
  PROJECTPARAMNAME: 'projectname',
  DETAILS: 'details',
  JOBS: `${JobsRoutesNames.JOBS}`,
  NEWJOB: 'new-job',
  JOBPARAM: ':jobnumber',
  JOBPARAMNAME: 'jobnumber',
};
