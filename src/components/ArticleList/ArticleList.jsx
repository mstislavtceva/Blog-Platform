/* eslint-disable indent */
import React, { useState } from 'react';

import Article from '../Article/Article';
import { useGetArticleListQuery } from '../../services/serviceAPI';
import Pagination from '../UI/Pagination/Pagination';
import Spinner from '../UI/Spinner/Spinner';
import ErrorMessage from '../UI/Messages/ErrorMessage';

import cl from './ArticleList.module.scss';

function ArticleList() {
  const [page, setPage] = useState(1);

  const { isLoading, isError, data } = useGetArticleListQuery(page);
  // console.log(isLoading, isError, data);

  const articleList =
    !isLoading && !isError && data ? (
      <>
        <ul className={cl.article__list}>
          {data
            ? data.articles.map(
                ({
                  slug,
                  favorited,
                  favoritesCount,
                  title,
                  tagList,
                  description,
                  createdAt,
                  author: { image, username },
                }) => (
                  <li key={slug} className={cl.article__item}>
                    <Article
                      slug={slug}
                      favorited={favorited}
                      favoritesCount={favoritesCount}
                      title={title}
                      tagList={tagList}
                      description={description}
                      createdAt={createdAt}
                      avatar={image}
                      username={username}
                    />
                  </li>
                )
              )
            : null}
        </ul>
        <Pagination total={data.articlesCount} current={page} pageSize={5} onChange={(count) => setPage(count)} />
      </>
    ) : null;

  return (
    <section className={cl.article}>
      {isLoading ? <Spinner /> : null}
      {isError && !isLoading && !data ? <ErrorMessage /> : null}
      {articleList}
    </section>
  );
}

export default ArticleList;
