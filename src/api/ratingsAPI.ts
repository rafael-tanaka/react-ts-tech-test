export type EstablishmentsType = {
  establishments: EstablishmentType[];
  meta: {
    dataSource: string;
    extractDate: string;
    itemCount: number;
    returncode: string;
    totalCount: number;
    totalPages: number;
    pageSize: number;
    pageNumber: number;
  };
  links: {
    rel: string;
    href: string;
  }[];
};

export type EstablishmentType = {
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  AddressLine4: string;
  BusinessName: string;
  BusinessType: string;
  BusinessTypeID: number;
  ChangesByServerID: number;
  Distance: number | null;
  FHRSID: number;
  LocalAuthorityBusinessID: string;
  LocalAuthorityCode: string;
  LocalAuthorityEmailAddress: string;
  LocalAuthorityName: string;
  LocalAuthorityWebSite: string;
  NewRatingPending: boolean;
  Phone: string;
  PostCode: string;
  RatingDate: string;
  RatingKey: string;
  RatingValue: string;
  RightToReply: string;
  SchemeType: string;
  geocode: {
    longitude: string;
    latitude: string;
  };
  scores: {
    Hygiene: number | null;
    Structural: number | null;
    ConfidenceInManagement: number | null;
  };
};

export type AuthorityType = {
  LocalAuthorityId: number;
  LocalAuthorityIdCode: string;
  Name: string;
  EstablishmentCount: number;
  SchemeType: number;
  links: {
    rel: string;
    href: string;
  }[];
};

export type AuthoritiesType = {
  authorities: AuthorityType[];
  meta: {
    dataSource: string;
    extractDate: string;
    itemCount: number;
    returncode: string;
    totalCount: number;
    totalPages: number;
    pageSize: number;
    pageNumber: number;
  };
  links: {
    rel: string;
    href: string;
  }[];
};

async function fetchWithErrorHandling<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export function getEstablishmentRatings(pageNum: number): Promise<EstablishmentsType> {
  return fetchWithErrorHandling<EstablishmentsType>(
    `http://api.ratings.food.gov.uk/Establishments/basic/${pageNum}/10`,
    { headers: { "x-api-version": "2" } }
  );
}

export function getAuthorities(pageNum: number): Promise<AuthoritiesType> {
  return fetchWithErrorHandling<AuthoritiesType>(
    `http://api.ratings.food.gov.uk/Authorities/basic`,
    { headers: { "x-api-version": "2" } }
  );
}

export function getEstablishmentsByAuthority(
  pageNum: number,
  authorityId: number
): Promise<EstablishmentsType> {
  return fetchWithErrorHandling<EstablishmentsType>(
    `http://api.ratings.food.gov.uk/Establishments?pageNumber=${pageNum}&pageSize=10&localAuthorityId=${authorityId}`,
    { headers: { "x-api-version": "2" } }
  );
}

export function getEstablishmentDetail(id: number): Promise<EstablishmentType> {
  return fetchWithErrorHandling<EstablishmentType>(
    `http://api.ratings.food.gov.uk/Establishments/${id}`,
    { headers: { "x-api-version": "2" } }
  );
}
