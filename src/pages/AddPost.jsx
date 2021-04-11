import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { useForm, Form } from '../hooks/useForm';
import * as common from '../common';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Loader from '../components/Loader';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { addPost } from '../redux/actions/postList';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '24px',
    marginTop: theme.spacing(6),
    [theme.breakpoints.up('md')]: { width: '50%', margin: '48px auto' },
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  tagWrapper: {
    marginBottom: theme.spacing(2),
    '& .tag': {
      display: 'inline-flex',
      alignItems: 'center',
      marginRight: '10px',
      padding: '4px 8px',
      borderRadius: '5px',
      fontSize: '12px',
      fontWeight: 500,
      color: '#fff',
      background: '#727272',
    },
  },
}));

const initValues = {
  title: '',
  subject: '',
  content: '',
  tag_input: '',
  tags: [],
};

const AddPost = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((state) => state.globalLoading.isLoading);
  const user = useSelector((state) => state.currentUser.info);
  const token = useSelector((state) => state.currentUser.token);

  const validate = (fieldValues) => {
    let temp = {};
    const { title, subject, content, tagInput } = fieldValues;

    if (title !== undefined) {
      if (title.trim() === '') temp.title = 'Title is required!';
    } else {
      errors.title && (temp.title = errors.title);
    }

    if (subject !== undefined) {
      if (subject.trim() === '') temp.subject = 'Subject is required!';
    } else {
      errors.subject && (temp.subject = errors.subject);
    }
    if (content !== undefined) {
      if (content.trim() === '') temp.content = 'content is required!';
    } else {
      errors.content && (temp.content = errors.content);
    }

    setErrors({ ...temp });
    return Object.keys(temp).length === 0;
  };

  const { values, setValues, handleChange, errors, setErrors } = useForm(
    initValues,
    true,
    validate
  );

  const handleKeyUp = (e) => {
    if (e.which === 13) {
      if (values.tag_input !== '') {
        setValues((old) => {
          return {
            ...old,
            tags: [
              ...old.tags,
              { text: values.tag_input, id: new Date().getTime().toString() },
            ],
            tag_input: '',
          };
        });
      }
    }
  };

  const handleRemoveTag = (id) => {
    setValues((old) => {
      return { ...old, tags: old.tags.filter((item) => item.id !== id) };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(values)) {
      const newPost = {
        title: values.title,
        subject: values.subject,
        content: values.content,
        tags: values.tags.map((tag) => tag.text),
      };
      dispatch(addPost(newPost, token, history));
    }
  };
  if (isLoading) return <Loader />;

  if (!user) {
    return <Redirect to='/' />;
  }
  return (
    <Paper className={classes.paper}>
      <Form title='New Post'>
        <common.Input
          fullWidth
          required
          autoFocus
          errors={errors}
          label='Title'
          name='title'
          onChange={handleChange}
          value={values.title}
        />
        <common.Input
          fullWidth
          required
          autoFocus
          errors={errors}
          label='Subject'
          name='subject'
          onChange={handleChange}
          value={values.subject}
        />
        <common.Input
          errors={errors}
          fullWidth
          required
          name='content'
          label='Content'
          onChange={handleChange}
          value={values.content}
        />
        <common.Input
          errors={errors}
          fullWidth
          name='tag_input'
          label='Tags'
          type='text'
          onKeyUp={handleKeyUp}
          onChange={handleChange}
          value={values.tag_input}
        />
        <div className={classes.tagWrapper}>
          {values.tags.map((tag, index) => {
            return (
              <span className='tag' key={tag.id}>
                <HighlightOffIcon
                  fontSize='small'
                  style={{ marginRight: '4px', cursor: 'pointer' }}
                  onClick={() => handleRemoveTag(tag.id)}
                />
                {tag.text}
              </span>
            );
          })}
        </div>
        <common.Button
          text='Publish Article'
          size='large'
          type='button'
          errors={errors}
          onClick={handleSubmit}
        />
        {/* <span style={{ color: 'red', fontWeight: '500', fontSize: '12px' }}>
          {error}
        </span>
        <span style={{ color: 'green', fontWeight: '500', fontSize: '12px' }}>
          {message}
        </span> */}
      </Form>
    </Paper>
  );
};

export default AddPost;
