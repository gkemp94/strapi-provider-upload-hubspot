# strapi-provider-upload-hubspot

## Description
This provider is used to upload files from Strapi into the HubSpot File Manager. It currently requires api key authentication. Visit the HubSpot [Developer Documentation](https://legacydocs.hubspot.com/docs/methods/auth/oauth-overview) for steps to obtain your api key for your portal. 

## Configurations

Your configuration is used to determine what portal and location in the file manager your files are uploaded to. 

See the [using a provider](https://strapi.io/documentation/v3.x/plugins/upload.html#using-a-provider) documentation for information on installing and using a provider. And see the [environment variables](https://strapi.io/documentation/v3.x/concepts/configurations.html#environment-variables) for setting and using environment variables in your configs.

**Example**

`./config/plugins.js`

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: "hubspot",
    providerOptions: {
      hapikey: env('HAPI_KEY'),
      root: env('FILE_MANAGER_ROOT_PATH')
    }
  },
  // ...
});
```

## Resources

- [MIT License](LICENSE.md)

## Links

- [HubSpot website](https://hubspot.com/)
- [HubSpot File Manager API Docs](https://legacydocs.hubspot.com/docs/methods/files/post_files)

## Roadmap
- [ ] Provide the Ability to Use OAuth Authentication
- [ ] Add Testing
- [ ] Upgrade to file manager api v2 when released
