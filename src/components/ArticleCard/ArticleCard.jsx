/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Markdown from 'markdown-to-jsx';
import { useParams } from 'react-router-dom';

import Spinner from '../UI/Spinner/Spinner';
import ErrorMessage from '../UI/Messages/ErrorMessage';
import Article from '../Article/Article';
import { useGetArticleQuery } from '../../services/articleService';

import cl from './ArticleCard.module.scss';

function ArticleCard() {
  // Смотрим наш slug, чтобы передать его в запрос и получить карточку
  const { param } = useParams();
  const { isLoading, isError, data } = useGetArticleQuery(param);

  if (!data) {
    return null;
  }

  const { title, tagList, favorited, body, favoritesCount, description, createdAt, slug, author } = data;

  return (
    <div className={cl.card}>
      {isLoading ? <Spinner /> : null}
      {isError ? <ErrorMessage /> : null}
      {!isLoading && !isError && (
        <div className={cl.card__item}>
          <Article
            title={title}
            favorited={favorited}
            favoritesCount={favoritesCount}
            tagList={tagList}
            username={author.username}
            createdAt={createdAt}
            avatar={author.image}
            description={description}
            slug={slug}
          />
        </div>
      )}
      <div className={cl.card__content}>{body && <Markdown>{body}</Markdown>}</div>
    </div>
  );
}

export default ArticleCard;
