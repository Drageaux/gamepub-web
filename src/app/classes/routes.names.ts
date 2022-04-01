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
  ROOTPROXYPARAM: ':id',
  ROOTPROXYPARAMNAME: 'id',
  PROJECTS: 'projects',
  PROJECTPARAM: ':projectname',
  PROJECTPARAMNAME: 'projectname',
  DETAILS: 'details',
  JOBS: `${JobsRoutesNames.JOBS}`,
  NEWJOB: 'new-job',
  JOBPARAM: ':jobnumber',
  JOBPARAMNAME: 'jobnumber',
};

export const AssetsRoutesNames = {
  NEWASSET: 'new-asset',
  ROOT: 'assets',
  ROOTPROXYPARAM: ':puid',
  ROOTPROXYPARAMNAME: 'puid',
  ASSETS: 'assets',
  ASSETPARAM: ':assetpuid',
  ASSETPARAMNAME: 'assetpuid',
  SLUGPARAM: ':slug',
  SLUGPARAMNAME: 'slug',
};
