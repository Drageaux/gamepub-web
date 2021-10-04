// A GitHub Content type
// https://developer.github.com/v3/repos/contents/
// generated using https://jvilk.com/MakeTypes/
export interface GithubContents {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: 'file' | 'symlink' | 'dir' | 'submodule';
  _links: GithubLinks;
}

export interface GithubLinks {
  self: string;
  git: string;
  html: string;
}
