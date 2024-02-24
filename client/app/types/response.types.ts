export type ResponseType = {
    loading: boolean;
}

export type InternetType = {
    setIsInternet: (isInternet: boolean) => void;
    firstTime: boolean;
}