/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Popconfirm } from 'antd';

import Tags from '../UI/Tags/Tags';
import {
  useDeleteArticleMutation,
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} from '../../services/articleService';
import Button from '../UI/Button/Button';
import HeartOff from '../UI/Hearts/HeartOff';
import HeartOn from '../UI/Hearts/HeartOn';

import cl from './Article.module.scss';

function Article({ slug, favorited, favoritesCount, title, tagList, description, createdAt, avatar, username }) {
  const navigate = useNavigate();
  const {
    user: { token },
  } = useSelector((state) => state.auth);

  // Проверяем, чтобы можно было нажать на заголовок только на странице "/articles"
  const location = useLocation();
  const isArticles = location.pathname === '/articles';

  // Функции управлением статьи
  const [deleteArticle] = useDeleteArticleMutation();
  const [likeArticle] = useLikeArticleMutation();
  const [unlikeArticle] = useUnlikeArticleMutation();

  // Форматирование времени создания поста
  const createdAtDate = format(new Date(createdAt), 'MMMM d, yyyy');

  const authUser = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') || '{}').user.username;
  let isEditMode = username === authUser;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isEditMode = username === authUser;
  }, [token]);

  // Подтвердить удаление
  const confirm = () => {
    deleteArticle(slug);
    navigate('/articles');
  };

  // Редактирование статьи
  const editArticleHandler = () => {
    navigate('edit');
  };

  // Лайк туда-сюда
  const toggleFavorited = favorited ? (
    <div onClick={() => unlikeArticle(slug)}>
      <HeartOn />
    </div>
  ) : (
    <div onClick={() => likeArticle(slug)}>
      <HeartOff />
    </div>
  );

  const likesView = token ? (
    toggleFavorited
  ) : (
    <div>
      <HeartOff />
    </div>
  );

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
          <div>{likesView}</div>
          <span className={cl.inner__likes}>{favoritesCount}</span>
        </div>
        {tagList ? <Tags tags={tagList} /> : null}
        <div className={cl.desc}>{description}</div>
      </div>
      <div className={cl.article__right}>
        <div className={cl.wrap}>
          <div className={cl.user}>
            <p className={cl.user__name}>{username}</p>
            <p className={cl.user__date}>{createdAtDate}</p>
          </div>
          <img className={cl.user__img} src={avatar} alt="Avatar author." />
        </div>
        {!isArticles && isEditMode ? (
          <div className={`${cl.buttons}`}>
            <Popconfirm
              title=""
              description="Are you sure about it?!?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <Button color="red" size="small">
                Delete
              </Button>
            </Popconfirm>
            <Button color="green" size="small" onClick={() => editArticleHandler()}>
              Edit
            </Button>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Article;
