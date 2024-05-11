import {
  useInfiniteQuery,
  useMutation,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UseAuth from "./UseAuth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINTS_BASE_URL || "/api/v1/",
});
interface fetcherFunctionProps {
  api: string;
  UserSession: string | null;
  lang: string;
  pageParam?: number;
  limit?: number;
  infiniteScroll?: boolean;
  paginationData?: boolean;
  addToken?: boolean;
}

const fetcherFunction = async ({
  api,
  UserSession,
  lang,
  pageParam,
  limit,
  infiniteScroll,
  paginationData,
  addToken,
}: fetcherFunctionProps) => {
  const headers = {
    "Content-Type": "application/json",
    "accept-language": lang,
  };
  const API = infiniteScroll
    ? `${api}page=${pageParam}&paginate=${limit}`
    : api;

  const res = await axiosInstance.get(API, {
    headers: headers,
    withCredentials: UserSession || addToken ? true : false,
  });

  return paginationData ? res.data?.data : res.data;
};

export const useFetchData = (
  identifier: string,
  api: string,
  select?: boolean,
  id: string | number = "",
  cacheTime = 5000,
  staleTime = 0,
  enabled = true,
  addToken: boolean = false,
  QueryOptions?: object
) => {
  const { UserSession } = UseAuth();
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";

  const useQueryOptions = {
    select: (data: any) => {
      return select ? data?.data : data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
    cacheTime: cacheTime,
    staleTime: staleTime,
    retry: 1,
    ...QueryOptions,
  };
  return useQuery({
    queryKey: [identifier, id],
    queryFn: () => fetcherFunction({ api, UserSession, lang, addToken }),
    ...useQueryOptions,
  });
};
export const useFetchParallelData = (
  identifier: string,
  iterators: string[],
  api: string,
  select?: boolean,
  cacheTime = 5000,
  staleTime = 0,
  enabled = true,
  addToken: boolean = false
) => {
  const { UserSession } = UseAuth();

  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";

  const useQueryOptions = {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
    cacheTime: cacheTime,
    staleTime: staleTime,
    retry: 1,
  };

  return useQueries({
    queries: iterators.map((iterator) => {
      return {
        queryKey: [identifier, iterator],
        queryFn: () =>
          fetcherFunction({
            api: api + iterator,
            UserSession,
            lang,
            addToken,
          }),
        ...useQueryOptions,
      };
    }),
  });
};

export const useFetchPaginatedData = (
  identifier: string,
  id: string | number = "",
  api: string,
  cacheTime = 500000,
  staleTime = 0,
  enabled = true,
  addToken: boolean = false,
  paginationData = true
) => {
  const { UserSession } = UseAuth();

  const { i18n } = useTranslation("");
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";

  const useFetchPaginatedDataOptions = {
    select: (data) => {
      return data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: enabled,
    cacheTime: cacheTime,
    refetchOnReconnect: true,
    staleTime: staleTime,
    retry: 1,
    keepPreviousData: true,
  };

  return useQuery({
    queryKey: [identifier, id],
    queryFn: () =>
      fetcherFunction({
        api,
        UserSession,
        lang,
        addToken,
        paginationData,
      }),
    ...useFetchPaginatedDataOptions,
  });
};
export const useFetchInfiniteScrollData = (
  identifier: string,
  api: string,
  limit = 10,
  refetchOnMount = false,
  enabled = true,
  infiniteScroll = true,
  select?: boolean,
  id: string | number = "",
  cacheTime = 5000,
  staleTime = 0
) => {
  const { UserSession } = UseAuth();

  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";

  const useQueryOptions = {
    select: (data) => {
      return select ? data[0] : data;
    },
    refetchOnMount: refetchOnMount,
    refetchOnWindowFocus: false,
    enabled: enabled,
    cacheTime: cacheTime,
    staleTime: staleTime,
    retry: 1,
  };
  return useInfiniteQuery({
    queryKey: [identifier],
    queryFn: ({ pageParam }) =>
      fetcherFunction({
        api,
        UserSession,
        lang,
        pageParam,
        limit,
        infiniteScroll,
      }),
    getNextPageParam: (lastPage, pages) => {
      if (pages?.length < lastPage?.meta?.last_page) {
        return pages?.length + 1;
      } else return undefined;
    },
    ...useQueryOptions,
    initialPageParam: 1,
  });
};
export const usePostData = (
  showToasts = false,
  onSuccess?: (data?: any) => void,
  authorizedAPI?: boolean,
  onError?: (err: AxiosError) => void
) => {
  const { UserSession } = UseAuth();

  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar") ? "ar" : "en";
  interface posterFunctionProps {
    api: string;
    data?: object;
    file?: boolean;
    addToken?: boolean;
    method?: "POST" | "DELETE" | "PATCH" | "PUT";
  }

  const posterFunction = async ({
    api,
    data,
    addToken = true,
    file,
    method = "POST",
  }: posterFunctionProps) => {
    const ContentType = file ? "multipart/form-data" : "application/json";

    const headers = {
      "Content-Type": ContentType,
      "accept-language": lang,
    };

    const options = {
      url: api,
      method: method,
      headers: headers,
      //data: JSON.stringify(data),
      data: data,
      withCredentials: UserSession || addToken ? true : false,
    };

    const res = await axiosInstance(options);
    return res.data;
  };
  const usePostDataOptions = {
    onSuccess: (data) => {
      showToasts && toast.success(data.message);
      onSuccess && onSuccess(data);
    },
    onError: (error: AxiosError) => {
      onError && onError(error);
      console.log("posterError", error);

      showToasts &&
        toast.error(
          error?.response?.data?.message || "Something Wrong has happened!"
        );
      authorizedAPI &&
        error?.response?.status === 401 &&
        navigate(`/${lang}/login`, { replace: true });
    },
  };
  const navigate = useNavigate();

  return useMutation({
    mutationFn: posterFunction,
    ...usePostDataOptions,
  });
};
