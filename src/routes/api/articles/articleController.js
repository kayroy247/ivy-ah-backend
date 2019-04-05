import generateSlug from '../../../helpers/slugGenerator';
import models from '../../../models';

const { articles } = models;
/**
 *
 *
 * @export
 * @class Articles
 */
export default class Article {
/**
 *
 *
 * @static
 * @param {*} request
 * @param {*} response
 * @memberof Articles
 * @returns {void}
 */
  static async create(request, response) {
    try {
      const {
        title, body, description, tagList, author
      } = request.body.article;
      const slug = generateSlug(title);
      const result = await articles.create({
        slug,
        title,
        body,
        description,
        tagList,
        author
      });
      if (result) {
        const { dataValues } = result;
        return response.status(201).json({
          status: 201,
          article: dataValues,
        });
      }
    } catch (err) {
      return response.status(500).json({
        status: 500,
        error: 'Something went wrong. Please try again later'
      });
    }
  }
}
