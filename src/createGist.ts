import request from "./structures/request";
import { GistFile, GistOptions, GistResponse } from "./types";

export default async (
    files: GistFile,
    description: string,
    token: string,
    options?: GistOptions
): Promise<GistResponse> => {
    return await request("https://api.github.com/gists", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            accept: "application/vnd.github.v3+json",
            Authorization: `Bearer ${token}`,
        },
        data: {
            description: description,
            files: {
                ...files,
            },
            public: options?.secret ? false : true,
        },
    })
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};