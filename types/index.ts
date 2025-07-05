export type CreateCategoryParams = {
  categoryName: string
}
// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface CreateProjectParams {
  projectName: string;
  coverImage: string;
  projectDescription: string;
  location: string;
  year: number;
  categoryId: string;
  status: 'idea' | 'progress' | 'completed';
  projectSize?: string;
  clientName?: string;
  projectPhotos?: {
    url: string;
    description: string;
    alt_text?: string;
    order?: number;
  }[];
  projectDiagrams?: {
    url: string;
    description: string;
    diagram_type?: 'floor_plan' | 'elevation' | 'section' | 'detail' | 'site_plan' | 'concept' | 'other';
    alt_text?: string;
    order?: number;
  }[];
}