module.exports = ({ env }) => ({
  i18n: true,
  'strapi-plugin-ja-pack': {
    enabled: true,
  },
  'preview-button': {
    config: {
      contentTypes: [
        {
          uid: 'api::article.article',
          draft: {
            url: 'http://localhost:3000/api/preview?type=article&slug={slug}'
          },
          published: {
            url: 'http://localhost:3000/articles/{slug}'
          }
        }
      ]
    }
  }
});

