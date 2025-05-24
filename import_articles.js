const axios = require('axios');
const fs = require('fs');

const articles = JSON.parse(fs.readFileSync('export_articles.json', 'utf8')).data;
const API_URL = "http://18.183.140.58:1337/api/articles";
// ← ここにStrapiのAPIトークンを記入
const token = 'acb5c396461d845707ab863925546b21ea041212c3acb2935d03932ef50b25eab366e62dba63b2338f226e68b99b98cdfd850662c94d904919fed9ff60ec10c86deb57490d98644e07686cb457b371917c07906a30704902186610cef34f7b93635505d9573203f51cf0d74e13b67c9f6d2072ac01858fbf4660c0a294c4b744';

(async () => {
  for (const article of articles) {
    try {
      const res = await axios.post(API_URL, {
        data: {
          title: article.title,
          content: article.content,
          thumbnail: article.thumbnail,
          tag: article.tags,
          docId: article.documentId
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`✔ Imported: ${article.title}`);
    } catch (err) {
      console.error(`✖ Failed: ${article.title}`, err.response?.data || err.message);
    }
  }
})();