/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { format } from 'date-fns';

import HeartOff from '../UI/Hearts/HeartOff';
import Tags from '../UI/Tags/Tags';

import cl from './Article.module.scss';

function Article({ slug, favorited, favoritesCount, title, tagList, description, createdAt, avatar, username }) {
  // eslint-disable-next-line no-console
  console.log(favorited);

  // Проверяем, чтобы можно было нажать на заголовок только на странице "/articles"
  const location = useLocation();
  const isArticles = location.pathname === '/articles';

  // Форматирование времени создания поста
  const createdAtDate = format(new Date(createdAt), 'MMMM d, yyyy');

  return (
    <>
      <div className={cl.article__left}>
        <div className={cl.inner}>
          {isArticles ? (
            <Link to={slug} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3 className={cl.inner__title}>{title}</h3>
            </Link>
          ) : (
            <h3 className={cl.inner__title}>{title}</h3>
          )}
          <div>
            <HeartOff />
          </div>
          <span className={cl.inner__likes}>{favoritesCount}</span>
        </div>
        {tagList ? <Tags tags={tagList} /> : null}
        <div className={cl.desc}>{description}</div>
      </div>
      <div className={cl.article__right}>
        <div className={cl.user}>
          <p className={cl.user__name}>{username}</p>
          <p className={cl.user__date}>{createdAtDate}</p>
        </div>
        <img className={cl.user__img} src={avatar} alt="Avatar author." />
      </div>
    </>
  );
}

export default Article;
