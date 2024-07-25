import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { message } from 'antd';

import CustomInput from '../UI/CustomInput/CustomInput';
import Button from '../UI/Button/Button';
import ButtonForm from '../UI/ButtonForm/ButtonForm';
import { useCreateArticleMutation, useEditArticleMutation, useGetArticleQuery } from '../../services/articleService';
import getOptions from '../Auth/Validation';

import cl from './ArticleNewEdit.module.scss';

function ArticleNewEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();

  const [api, contextHolder] = message.useMessage();

  //   Название заголовка в зависимости от типа
  const articleTitle = location.pathname === '/new-article' ? 'Create new Article' : 'EditArticle';

  //   Отправлять статью в зависимости от типа
  const postArticleMutation = location.pathname === '/new-article' ? useCreateArticleMutation : useEditArticleMutation;
  const [postArticle, { error, isSuccess, data }] = postArticleMutation();

  // Есть ли слаг
  const slug = location.pathname === '/new-article' ? undefined : param.param;

  //   Если есть слаг, значит редактирование статьи, нужна функция, чтобы получить данные с существующей
  const getArticleQuery = slug ? useGetArticleQuery : undefined;
  let articleData;
  if (slug) {
    const { data: fetchData } = getArticleQuery(slug);
    articleData = fetchData;
  }

  //   Дефолтные значения, если создание статьи
  const defaultValues = {
    title: '',
    desc: '',
    text: '',
    tags: [{ tag: '' }],
  };

  // Работа с формой
  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
    control,
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues,
  });

  //   Дефолтные значения, если редактирование
  useEffect(() => {
    const values = {};

    if (articleData) {
      values.title = articleData.title;
      values.desc = articleData.description;
      values.text = articleData.body;

      const tags = [];
      articleData.tagList.forEach((tag) => {
        tags.push({ tag });
      });
      if (tags.length) {
        values.tags = tags;
      }
    }

    reset(values);
  }, [reset, articleData]);

  //   Для работы с тегами
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  //   Если отправилась статья
  useEffect(() => {
    if (isSuccess && data) {
      console.log('its done');
      // eslint-disable-next-line no-unused-expressions
      location.pathname === '/new-article' ? navigate('/articles') : navigate(`/articles/${slug}`);
      clearErrors();
      navigate('/articles');
      api.open({ type: 'success', content: 'Your data has been successfully posted' });
    }
  }, [isSuccess, data, clearErrors, location.pathname, navigate, slug, api]);

  const isFetchBaseQueryError = (errorFetch) =>
    typeof errorFetch === 'object' && errorFetch !== null && 'status' in errorFetch;

  //   Если ошибка при отправлении статьи
  useEffect(() => {
    if (error && isFetchBaseQueryError(error)) {
      console.log('its error');
      const serverMessages = JSON.parse(JSON.stringify(error.data));
      //   eslint-disable-next-line no-restricted-syntax
      for (const key in serverMessages.errors) {
        if (key === 'title' || key === 'desc' || key === 'text' || key === 'tags') {
          setError(key, { message: serverMessages.errors[key] });
        }
      }
      api.open({ type: 'error', content: 'Some error' });
      clearErrors();
    }
  }, [error, clearErrors, setError, api]);

  const onSubmit = async (formData) => {
    const tagLists = [];

    formData.tags.forEach((tag) => {
      if (tag.tag) {
        tagLists.push(tag.tag);
      }
    });
    await postArticle({
      article: {
        title: formData.title,
        description: formData.desc,
        body: formData.text,
        tagList: tagLists,
        slug,
      },
    });
  };

  return (
    <div className={cl.wrapper}>
      {contextHolder}
      <div className={cl.article}>
        <h1 className={cl.article__title}>{articleTitle}</h1>
        <form className={cl.article__form} onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Title"
            register={register}
            errors={errors}
            options={getOptions().title}
            name="title"
            type="text"
            placeholder="Title"
          />
          <CustomInput
            label="Short description"
            register={register}
            errors={errors}
            options={getOptions().desc}
            name="desc"
            type="text"
            placeholder="Short description"
          />
          <CustomInput
            label="Text"
            register={register}
            errors={errors}
            options={getOptions().text}
            name="text"
            type="textarea"
            placeholder="Text"
          />
          <div className={cl.article__tags}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className={cl.article__label}>Tags</label>
            {/* eslint-disable-next-line arrow-body-style */}
            {fields.map((field, id) => {
              return (
                <div key={field.id} className={cl.tag}>
                  <div className={cl.tag__input}>
                    <CustomInput
                      register={register}
                      errors={errors}
                      name={`tags.${id}.tag`}
                      placeholder="Tag"
                      type="text"
                    />
                  </div>
                  {fields.length !== 1 ? (
                    <Button color="red" onClick={() => remove(id)}>
                      Delete
                    </Button>
                  ) : (
                    <Button color="red">Delete</Button>
                  )}
                  {id === fields.length - 1 && (
                    <Button color="blue" onClick={() => append({ tag: '' })}>
                      Add Tag
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
          <div className={cl['btn-submit']}>
            <ButtonForm>Send</ButtonForm>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ArticleNewEdit;
