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
  ROOTPROXYPARAM: ':projectid',
  ROOTPROXYPARAMNAME: 'projectid',
  PROJECTS: 'projects',
  PROJECTPARAM: ':projectname',
  PROJECTPARAMNAME: 'projectname',
  DETAILS: 'details',
  JOBS: `${JobsRoutesNames.JOBS}`,
  NEWJOB: 'new-job',
  JOBPARAM: ':jobnumber',
  JOBPARAMNAME: 'jobnumber',
  JOBSUBMISSIONS: 'submissions',
  JOBSUBMISSIONPARAM: ':submissionnumber',
  JOBSUBMISSIONPARAMNAME: 'submissionnumber',
};

export const AssetsRoutesNames = {
  NEWASSET: 'new-asset',
  ROOT: 'assets',
  ROOTPROXYPARAM: ':assetpuid',
  ROOTPROXYPARAMNAME: 'assetpuid',
  ASSETS: 'assets',
  ASSETPARAM: ':assetpuid',
  ASSETPARAMNAME: 'assetpuid',
  SLUGPARAM: ':assetslug',
  SLUGPARAMNAME: 'assetslug',
};
