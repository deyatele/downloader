export interface IOptionsDate {
  vid?: string;
  title?: string;
  fn?: string;
  a?: string;
  t?: number;
  links?: ILinksOptionsDate;
  token?: string;
  timeExpires?: string;
  status: string;
  p?: string;
  mess: string;
}

export interface ILinksOptionsDate {
  [key: string]: {
    [name: string]: ILinksOptionsDateName;
  };
}

export interface ILinksOptionsDateName {
  f: string;
  k: string;
  q: string;
  size: string;
  key: string;
  selected: boolean | null;
}

export interface IQuessionDownload {
  v_id: string;
  ftype: string;
  fquality: string;
  fname: string;
  timeExpire: string;
  token: string;
}
export interface TResponseLinkRedirect {
  d_url?: string;
  c_server?: string;
  c_status?: string;
}

export interface TResponseLinkSuccess {
  result?: string;
  status?: string;
  statusCode?: string;
}

export interface IResponseDownloadLink {
  jobId?: string;
  result: string;
  status: string;
  statusCode: number;
}
