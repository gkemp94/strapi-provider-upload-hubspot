"use strict";

const axios = require("axios");
const FormData = require("form-data");

module.exports = {
  init(providerOptions) {
    const { root = "strapi", hapikey } = providerOptions;

    const hs = axios.create({
      baseURL: "https://api.hubapi.com/filemanager/api/v2/files",
    });

    hs.interceptors.request.use((config) => {
      config.params = config.params || {};
      config.params.hapikey = hapikey;
      return config;
    });

    return {
      upload: async (file, customParams = {}) => {
        const path = file.path ? `${file.path}/` : "";
        const formData = new FormData();

        formData.append("files", file.buffer, {
          filename: file.hash,
          contentType: file.mime,
        });
        formData.append("files_names", file.hash);
        formData.append("folder_paths", `${root}/${path}`);

        const { data } = await hs({
          method: "post",
          params: {
            overwrite: true,
          },
          headers: formData.getHeaders(),
          data: formData.getBuffer(),
        });

        const uploadedFile = data.objects[0];
        file.url = uploadedFile.friendly_url;
        file.provider_metadata = {
          id: uploadedFile.id,
        };
        return;
      },
      delete: async (file) => {
        const fileId = file.provider_metadata.id;
        await hs.delete(`/${fileId}`);
        return;
      },
    };
  },
};
